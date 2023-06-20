import { open } from 'lmdb';
import path from 'path';
import * as vscode from 'vscode';
const deactivationEvents: (() => Promise<void>)[] = [];
export async function activate(context: vscode.ExtensionContext) {                                                    
    let db = open(context.asAbsolutePath('db'), {
        
    });
}   

// this method is called when your extension is deactivated
export async function deactivate(): Promise<void> {    
    for (let deactivateME of deactivationEvents) {
        await deactivateME();
    }
}