// to run: npm test


const vscode = require('vscode');
const assert = require('assert');
const extension = require('../extension');

function printDebugInfo(someName, someVar) {
    console.log("\n\!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("This is the ", someName, ":");
    console.log(someVar);
    console.log("#######################################\n");
}

function assertAllTokensDifferent(text1, text2) {
	assert.notStrictEqual(text1, text2);
	const tokens1 = text1.match(/\b\w+\b/g);
	const tokens2 = text2.match(/\b\w+\b/g);
		tokens1.forEach(token => {
			assert.strictEqual(tokens2.includes(token), false);
		});
}

suite('Extension Test Suite', () => {

	test('Test 00 anonymizeAndCopy all sanitized', async () => {
		const doc = await vscode.workspace.openTextDocument({ content: ' ' });
		const editor = await vscode.window.showTextDocument(doc);
		assert.ok(editor, 'No active editor');
		editor.selection = new vscode.Selection(0, 0, 0, 10);
		const originalText = 'table2.somename allthe01 wordshere 23432 shouldbe.sanitized0';
		await editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, originalText);
		});
		await vscode.commands.executeCommand('code-sanitizer.anonymizeAndCopy');
		const clipboardText = await vscode.env.clipboard.readText();
		assertAllTokensDifferent(originalText, clipboardText);
    });
	
    test('Test 01 anonymizeAndCopy with SQL keywords', async () => {
		const doc = await vscode.workspace.openTextDocument({ content: ' ' });
		const editor = await vscode.window.showTextDocument(doc);
		assert.ok(editor, 'No active editor');
		editor.selection = new vscode.Selection(0, 0, 0, 10);
		const originalText = 'SELECT * FROM table1.sometoken where column1 = 1234324 AND column2 = 23432';
		await editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, originalText);
		});
		await vscode.commands.executeCommand('code-sanitizer.anonymizeAndCopy');
		const clipboardText = await vscode.env.clipboard.readText();
		
		// First 13 characters should be the same
		assert.strictEqual(clipboardText.substring(0, 13), originalText.substring(0, 13));
		
		// The entire thing should be different
		assert.notStrictEqual(clipboardText, originalText);

		// If the token is in ["SELECT", "FROM", "where", "AND"], it should be the same, else it should be different
		const tokens = originalText.match(/\b\w+\b/g);
		tokens.forEach(token => {
			const sqlReservedWords = ["SELECT", "FROM", "where", "AND"];
			if (sqlReservedWords.includes(token)) {
				assert.strictEqual(clipboardText.includes(token), true);
			} else {
				assert.strictEqual(clipboardText.includes(token), false);
			}
		});
    });


	// TODO copy back full test
    // test('Test 02 unanonymizeAndPaste all sanitized', async () => {

	
    test('Test 03 unanonymizeAndPaste ultra simple', async () => {
		let doc = await vscode.workspace.openTextDocument({ content: ' ' });
		let editor = await vscode.window.showTextDocument(doc);
		let document = editor.document;
		assert.ok(editor, 'No active editor');
		const originalText = `thisisa verysimple testfor theunanonymizefunction`;
		// printDebugInfo("originalText (should be full length and unsanitized", originalText);
		await editor.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(0, 0), originalText);
		});

		// Copy and sanitize
		editor.selection = new vscode.Selection(0, 0, 0, originalText.length);
		await vscode.commands.executeCommand('code-sanitizer.anonymizeAndCopy');

		// Clear the editor
		await vscode.commands.executeCommand('editor.action.selectAll');
		await vscode.commands.executeCommand('editor.action.deleteLines');

		// Paste in editor
		await vscode.commands.executeCommand('editor.action.clipboardPasteAction');

		// Assert that every token in selection is different from the original text
		assertAllTokensDifferent(originalText, document.getText());

		// Set clipboard to something random (to make sure we're grabbing sanitized text)
		await vscode.env.clipboard.writeText("random text");

		// Copy all text in the editor such that clipboard contains the sanitized text
		editor.selection = new vscode.Selection(0, 0, document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
		await vscode.commands.executeCommand('editor.action.clipboardCopyAction');

		// Assert that every token in the clipboard is different from the original text
		assertAllTokensDifferent(originalText, await vscode.env.clipboard.readText());

		// Replace all text in the editor with "hello world"
		// const text_before_helloworld = document.getText();
		// printDebugInfo("text_before_priting_hello_world", text_before_helloworld);
		await editor.edit(editBuilder => {
			// Create a range that covers the entire document
			let range = new vscode.Range(
				document.positionAt(0),
				document.positionAt(document.getText().length)
			);

			// Replace the range with "hello world"
			editBuilder.replace(range, "hello world");
		});

		// Replace all text in the editor with the unsanitized text
		assertAllTokensDifferent(originalText, document.getText());
		editor.selection = new vscode.Selection(0, 0, document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
		await vscode.commands.executeCommand('code-sanitizer.unanonymizeAndPaste');

		// Assert that the finalText is equal to the originalTextHalf
		assert.strictEqual(document.getText(), originalText);
    });

    test('Test 04 unanonymizeAndPaste half, no SQL', async () => {
		let doc = await vscode.workspace.openTextDocument({ content: ' ' });
		let editor = await vscode.window.showTextDocument(doc);
		let document = editor.document;
		assert.ok(editor, 'No active editor');
		const originalText = `Wewilltry.amuchlonger pieceoftext tocheck ifthe unanonymize functionworksproperly
		thisisjust averylong stringwithlotsofwords andpunctuationmarks! moreoverthere aresomenumbers1234
		andalsosome1 specialcharacterslike $%&/()=?^* andalsosome! whitespaces
		andthen, itrepeasts twotimes
		Wewilltry.amuchlonger pieceoftext tocheck ifthe unanonymize functionworksproperly
		thisisjust averylong stringwithlotsofwords andpunctuationmarks! moreoverthere aresomenumbers1234
		andalsosome specialcharacterslike $%&/()=?^* andalsosome whitespaces
		Wewilltry.amuchlonger pieceoftext tocheck ifthe unanonymize functionworksproperly
		thisisjust averylong stringwithlotsofwords andpunctuationmarks! moreoverthere aresomenumbers1234
		andalsosome1 specialcharacterslike $%&/()=?^* andalsosome! whitespaces
		andtheend`;
		await editor.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(0, 0), originalText);
		});
		printDebugInfo("originalText (should be full length and unsanitized", originalText);

		// Copy and sanitize
		let lineCount = editor.document.lineCount;
		editor.selection = new vscode.Selection(0, 0, lineCount - 1, editor.document.lineAt(lineCount - 1).text.length);
		await vscode.commands.executeCommand('code-sanitizer.anonymizeAndCopy');

		// Clear the editor
		await vscode.commands.executeCommand('editor.action.selectAll');
		await vscode.commands.executeCommand('editor.action.deleteLines');

		// Paste in editor so that editor contains sanitized text
		await vscode.commands.executeCommand('editor.action.clipboardPasteAction');

		// Assert that every token in selection is different from the original text
		assertAllTokensDifferent(originalText, document.getText());

		// Assert that the third line of pastedText is the same as penultimate line of pastedText
		// This is to make sure that same symbols get mapped to same sanitized tokens
		const pastedLines = document.getText().split('\n');
		assert.strictEqual(pastedLines[2], pastedLines[9]);

		// Set clipboard to something random
		await vscode.env.clipboard.writeText("random text");

		// Copy half of text in the editor such that clipboard contains 7 lines of sanitized text
		let halfLines = 7;
		editor.selection = new vscode.Selection(0, 0, halfLines, 0);
		await vscode.commands.executeCommand('editor.action.clipboardCopyAction');

		// Assert that every token in the clipboard is different from the original text
		assertAllTokensDifferent(originalText, await vscode.env.clipboard.readText());  // Won't be true with SQL

		// Replace all text in the editor with "hello world"
		// const text_before_helloworld = document.getText();
		// printDebugInfo("text_before_priting_hello_world", text_before_helloworld);
		await vscode.commands.executeCommand('editor.action.selectAll');
		await vscode.commands.executeCommand('editor.action.deleteLines');		
		await editor.edit(editBuilder => {
			// Create a range that covers the entire document
			let range = new vscode.Range(
				document.positionAt(0),
				document.positionAt(document.getText().length)
			);

			// Replace the range with "hello world"
			editBuilder.replace(range, "hello world");
		});

		// Replace all text in the editor with the unsanitized text
		assertAllTokensDifferent(originalText, document.getText());

		// Replace all text with unanonymized version
		await vscode.commands.executeCommand('editor.action.selectAll');
		await vscode.commands.executeCommand('code-sanitizer.unanonymizeAndPaste');

		// Assert that the finalText is equal to the first 7 lines of the originalText
		const originalTextHalf = originalText.split('\n').slice(0, halfLines).join('\n') + '\r\n';
		printDebugInfo("originalTextHalf", originalTextHalf);
		printDebugInfo("finalText", document.getText());
		assert.strictEqual(document.getText().replace(/\r\n/g, '\n'), originalTextHalf.replace(/\r\n/g, '\n'));
    });


	// TODO    test('Test 05 unanonymizeAndPaste with SQL keywords', async () => {

});