import type {Gen} from '@feltcoop/gro';
import ts from 'typescript';

import {exports} from '$lib/exports';
import type {Logger} from '$lib/log';

export interface Manifest {
	exports: ManifestExport[];
}
// TODO name? Export?
interface ManifestExport {
	file: string;
	identifiers: ManifestExportIdentifier[];
}
interface ManifestExportIdentifier {
	name?: string;
	type?: string;
}

export const gen: Gen = async ({fs, log}) => {
	const json: Manifest = {exports: []};

	for (const file of exports) {
		const manifestExport: ManifestExport = {file, identifiers: []};
		json.exports.push(manifestExport);
		const importPath = 'src/' + file;
		const contents = await fs.readFile(importPath, 'utf8'); // eslint-disable-line no-await-in-loop
		console.log(file, contents.length);

		const node = ts.createSourceFile(importPath, contents, ts.ScriptTarget.Latest);
		// console.log(`node`, node.statements);
		for (const s of node.statements) {
			const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed});
			let identifier: ManifestExportIdentifier | undefined;
			if (s.name) {
				(identifier || (identifier = {})).name = printer.printNode(
					ts.EmitHint.Unspecified,
					s.name,
					node,
				);
			} else if (s.declarationList) {
				(identifier || (identifier = {})).name = printer.printNode(
					ts.EmitHint.Unspecified,
					s.declarationList.declarations[0].name,
					node,
				);
				console.log(`s.declarationList.declarations[0]`, s.declarationList.declarations[0]);
				if (
					s.declarationList.declarations[0].type ||
					s.declarationList.declarations[0].initializer.type
				) {
					(identifier || (identifier = {})).type = normalizeType(
						s.declarationList.declarations[0].type
							? printer.printNode(
									ts.EmitHint.Unspecified,
									s.declarationList.declarations[0].type,
									node,
							  )
							: printParams(printer, s.declarationList.declarations[0], node, log),
					);

					// '(' +
					//   printer.printList(
					// 		ts.EmitHint.Unspecified,
					// 		s.declarationList.declarations[0].initializer.parameters,
					// 		node,
					//   ) +
					//   ') => ' +
					//   printer.printNode(
					// 		ts.EmitHint.Unspecified,
					// 		s.declarationList.declarations[0].initializer.type,
					// 		node,
					//   );
					// console.log(`identifier.type`, identifier.type);
				}
			}
			if (s.type) {
				(identifier || (identifier = {})).type = printer.printNode(
					ts.EmitHint.Unspecified,
					s.type,
					node,
				);
			}
			// console.log(`s`, s);
			console.log(`identifier`, identifier);
			if (identifier) manifestExport.identifiers.push(identifier);
		}
		// await fs.writeFile(importPath + '.ts', printed, 'utf8');
	}

	return JSON.stringify(json);
};

const normalizeType = (t: string) => {
	if (t.endsWith(' ;')) return t.slice(0, -2);
	return t;
};

// TODO this is a hacky first pass at using the API, I'm definitely not doing things the best way
const printParams = (printer: ts.Printer, n: any, sourceFile: ts.SourceFile, log: Logger) => {
	if (n.initializer) {
		const initializer: any = {
			...n.initializer,
			body: undefined,
			equalsGreaterThanToken: undefined,
		};
		log.error('[printParams]', `initializer`, initializer);
		return printer.printNode(ts.EmitHint.Unspecified, initializer, sourceFile);
	} else {
		return printer.printNode(ts.EmitHint.Unspecified, n, sourceFile);
	}
};
