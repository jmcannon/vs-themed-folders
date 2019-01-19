const vscode = require('vscode');
const DEFAULT_COLOR = vscode.workspace.getConfiguration('workbench').get('colorTheme');

const listener = function(event) {
	let color = DEFAULT_COLOR;
	const activePath = vscode.window.activeTextEditor.document.fileName;
	const config = vscode.workspace.getConfiguration('themedFolders').get('paths');

	const matches = Object.keys(config).filter(path => activePath.indexOf(path) > -1);

	if (matches.length > 0) {
		color = config[matches[0]];
	}

	vscode.workspace.getConfiguration('workbench').update('colorTheme', color);
}

function activate(context) {
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(listener));
}
exports.activate = activate;

function deactivate() {
	vscode.workspace.getConfiguration('workbench').update('colorTheme', DEFAULT_COLOR);
}

module.exports = {
	activate,
	deactivate
}
