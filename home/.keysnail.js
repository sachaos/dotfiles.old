// ========================== KeySnail Init File =========================== //

// この領域は, GUI により設定ファイルを生成した際にも引き継がれます
// 特殊キー, キーバインド定義, フック, ブラックリスト以外のコードは, この中に書くようにして下さい
// ========================================================================= //
//{{%PRESERVE%
// bookmarkを開くときは新規タブで開く
// plugin.options["bmany.default_open_type"] = "tab";
//}}%PRESERVE%
// ========================================================================= //

//Caret Hintキーバインド変更
plugins.options["caret_hint.head_key"] = "m";//c → m
plugins.options["caret_hint.tail_key"] = "M";//C → M


// ========================= Special key settings ========================== //

key.quitKey              = "C-q";
key.helpKey              = "<f1>";
key.escapeKey            = "C-g";
key.macroStartKey        = "undefined";
key.macroEndKey          = "undefined";
key.suspendKey           = "<f2>";
key.universalArgumentKey = "C-u";
key.negativeArgument1Key = "C--";
key.negativeArgument2Key = "C-M--";
key.negativeArgument3Key = "M--";

// ================================= Hooks ================================= //

hook.addToHook('KeyBoardQuit', function (aEvent) {
    if (key.currentKeySequence.length)
        return;

    command.closeFindBar();

    let marked = command.marked(aEvent);

    if (util.isCaretEnabled())
    {
        if (marked)
        {
            command.resetMark(aEvent);
        }
        else
        {
            if ("blur" in aEvent.target) aEvent.target.blur();

            gBrowser.focus();
            _content.focus();
        }
    }
    else
    {
        goDoCommand("cmd_selectNone");
    }

    if (KeySnail.windowType === "navigator:browser" && !marked)
    {
        key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
    }
});

// ============================= Key bindings ============================== //

key.setGlobalKey('C-M-r', function (ev) {
    userscript.reload();
}, '設定ファイルを再読み込み', true);

key.setGlobalKey('M-x', function (ev, arg) {
    ext.select(arg, ev);
}, 'エクステ一覧表示', true);

key.setGlobalKey(["<f1>", "b"], function (ev) {
    key.listKeyBindings();
}, 'キーバインド一覧を表示', false);

key.setGlobalKey('C-m', function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RETURN, true);
}, 'リターンコードを生成', false);

key.setGlobalKey(["<f1>", "F"], function (ev) {
    openHelpLink("firefox-help");
}, 'Firefox のヘルプを表示', false);

key.setGlobalKey("C-t", function (ev) {
    document.getElementById("cmd_newNavigatorTab").doCommand();
}, '新しいタブを開く');

key.setGlobalKey(["C-x", "l"], function (ev) {
    command.focusToById("urlbar");
}, 'ロケーションバーへフォーカス', true);

key.setGlobalKey(["C-x", "s"], function (ev) {
    command.focusToById("searchbar");
}, '検索バーへフォーカス', true);

key.setGlobalKey(["C-x", "i"], function (ev) {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, '最初のインプットエリアへフォーカス', true);

// key.setGlobalKey(["C-x"], function (ev) {
//                 command.focusElement(command.elementsRetrieverButton, 0);
//             }, '最初のボタンへフォーカス', true);

key.setGlobalKey('C-s', function (ev) {
    command.iSearchForwardKs(ev);
}, 'Emacs ライクなインクリメンタル検索', true);

key.setGlobalKey('C-r', function (ev) {
    command.iSearchBackwardKs(ev);
}, 'Emacs ライクな逆方向インクリメンタル検索', true);

key.setGlobalKey(["C-x", "k"], function (ev) {
    BrowserCloseTabOrWindow();
}, 'タブ / ウィンドウを閉じる', false);

key.setGlobalKey(["C-x", "K"], function (ev) {
    closeWindow(true);
}, 'ウィンドウを閉じる', false);

key.setGlobalKey(["C-c", "u"], function (ev) {
    undoCloseTab();
}, '閉じたタブを元に戻す', false);

key.setGlobalKey(["C-x", "n"], function (ev) {
    OpenBrowserWindow();
}, 'ウィンドウを開く', false);

key.setGlobalKey('C-M-l', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'ひとつ右のタブへ', false);

key.setGlobalKey('C-M-h', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'ひとつ左のタブへ', false);

key.setGlobalKey(["C-x", "C-c"], function (ev) {
    goQuitApplication();
}, 'Firefox を終了', true);

key.setGlobalKey(["C-x", "o"], function (ev, arg) {
    command.focusOtherFrame(arg);
}, '次のフレームを選択', false);

key.setGlobalKey(["C-x", "1"], function (ev) {
    window.loadURI(ev.target.ownerDocument.location.href);
}, '現在のフレームだけを表示', true);

key.setGlobalKey(["C-x", "C-f"], function (ev) {
    BrowserOpenFileWindow();
}, 'ファイルを開く', true);

key.setGlobalKey(["C-x", "C-s"], function (ev) {
    saveDocument(window.content.document);
}, 'ファイルを保存', true);

key.setGlobalKey(["C-c", "C-c", "C-v"], function (ev) {
    toJavaScriptConsole();
}, 'Javascript コンソールを表示', true);

key.setGlobalKey(["C-c", "C-c", "C-c"], function (ev) {
    command.clearConsole();
}, 'Javascript コンソールの表示をクリア', true);

key.setEditKey(["C-x", "h"], function (ev) {
    command.selectAll(ev);
}, '全て選択', true);

key.setEditKey([["C-`"], ["C-@"]], function (ev) {
    command.setMark(ev);
}, 'マークをセット', true);

key.setEditKey('C-o', function (ev) {
    command.openLine(ev);
}, '行を開く (Open line)', false);

key.setEditKey([["C-x", "u"], ["C-_"]], function (ev) {
    display.echoStatusBar("Undo!", 2000);
    goDoCommand("cmd_undo");
}, 'アンドゥ', false);

key.setEditKey('C-\\', function (ev) {
    display.echoStatusBar("Redo!", 2000);
    goDoCommand("cmd_redo");
}, 'リドゥ', false);

key.setEditKey('C-a', function (ev) {
    command.beginLine(ev);
}, '行頭へ移動', false);

key.setEditKey('C-e', function (ev) {
    command.endLine(ev);
}, '行末へ', false);

key.setEditKey('C-f', function (ev) {
    command.nextChar(ev);
}, '一文字右へ移動', false);

key.setEditKey('C-b', function (ev) {
    command.previousChar(ev);
}, '一文字左へ移動', false);

key.setEditKey('C-n', function (ev) {
    command.nextLine(ev);
}, '一行下へ', false);

key.setEditKey('C-p', function (ev) {
    command.previousLine(ev);
}, '一行上へ', false);

key.setEditKey('C-v', function (ev) {
    command.pageDown(ev);
}, '一画面分下へ', false);

key.setEditKey('M-<', function (ev) {
    command.moveTop(ev);
}, 'テキストエリア先頭へ', false);

key.setEditKey('M->', function (ev) {
    command.moveBottom(ev);
}, 'テキストエリア末尾へ', false);

key.setEditKey('C-d', function (ev) {
    goDoCommand("cmd_deleteCharForward");
}, '次の一文字削除', false);

key.setEditKey('C-h', function (ev) {
    goDoCommand("cmd_deleteCharBackward");
}, '前の一文字を削除', false);

key.setEditKey([["C-<backspace>"], ["M-<delete>"]], function (ev) {
    command.deleteBackwardWord(ev);
}, '前の一単語を削除', false);

key.setEditKey('C-k', function (ev) {
    command.killLine(ev);
}, 'カーソルから先を一行カット (Kill line)', false);

key.setEditKey('C-y', command.yank, '貼り付け (Yank)', false);

key.setEditKey('M-y', command.yankPop, '古いクリップボードの中身を順に貼り付け (Yank pop)', true);

key.setEditKey('M-w', function (ev) {
    goDoCommand('cmd_copy');
}, '選択中のテキストをコピー', true);

key.setEditKey('C-M-y', function (ev) {
    if (!command.kill.ring.length)
        return;

    let (ct = command.getClipboardText())
    (!command.kill.ring.length || ct != command.kill.ring[0]) && command.pushKillRing(ct);

    prompt.selector(
        {
            message: "Paste:",
            collection: command.kill.ring,
            callback: function (i) { if (i >= 0) key.insertText(command.kill.ring[i]); }
        }
    );
}, '以前にコピーしたテキスト一覧から選択して貼り付け', true);

key.setEditKey('C-w', function (ev) {
    goDoCommand("cmd_copy");
    goDoCommand("cmd_delete");
    command.resetMark(ev);
}, '選択中のテキストを切り取り (Kill region)', true);

key.setEditKey(["C-x", "r", "d"], function (ev, arg) {
    command.replaceRectangle(ev.originalTarget, "", false, !arg);
}, '矩形削除', true);

key.setEditKey(["C-x", "r", "t"], function (ev) {
    prompt.read("String rectangle: ", function (aStr, aInput) {
        command.replaceRectangle(aInput, aStr);
    },
                ev.originalTarget);
}, '矩形置換', true);

key.setEditKey(["C-x", "r", "o"], function (ev) {
    command.openRectangle(ev.originalTarget);
}, '矩形行空け', true);

key.setEditKey(["C-x", "r", "k"], function (ev, arg) {
    command.kill.buffer = command.killRectangle(ev.originalTarget, !arg);
}, '矩形キル', true);

key.setEditKey(["C-x", "r", "y"], function (ev) {
    command.yankRectangle(ev.originalTarget, command.kill.buffer);
}, '矩形ヤンク', true);

key.setViewKey([["C-n"], ["j"]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, '一行スクロールダウン', false);

key.setViewKey([["C-p"], ["k"]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_UP, true);
}, '一行スクロールアップ', false);

key.setViewKey([["C-f"], ["."]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
}, '右へスクロール', false);

key.setViewKey([["C-b"], [","]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_LEFT, true);
}, '左へスクロール', false);

key.setViewKey([["M-v"], ["b"]], function (ev) {
    goDoCommand("cmd_scrollPageUp");
}, '一画面分スクロールアップ', false);

key.setViewKey('C-v', function (ev) {
    goDoCommand("cmd_scrollPageDown");
}, '一画面スクロールダウン', false);

key.setViewKey([["M-<"], ["g"]], function (ev) {
    goDoCommand("cmd_scrollTop");
}, 'ページ先頭へ移動', true);

key.setViewKey([["M->"], ["G"]], function (ev) {
    goDoCommand("cmd_scrollBottom");
}, 'ページ末尾へ移動', true);

key.setViewKey('l', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'ひとつ右のタブへ', false);

key.setViewKey('h', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'ひとつ左のタブへ', false);

key.setViewKey(':', function (ev, arg) {
    shell.input(null, arg);
}, 'コマンドの実行', true);

key.setViewKey('R', function (ev) {
    BrowserReload();
}, '更新', true);

key.setViewKey('<backspace>', function (ev) {
    BrowserBack();
}, '戻る', false);

key.setViewKey('F', function (ev) {
    BrowserForward();
}, '進む', false);

key.setViewKey(["C-x", "h"], function (ev) {
    goDoCommand("cmd_selectAll");
}, 'すべて選択', true);

key.setViewKey('I', function (ev) {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, '最初のインプットエリアへフォーカス', true);

key.setViewKey('M-p', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, '次のボタンへフォーカスを当てる', false);

key.setViewKey('M-n', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, '前のボタンへフォーカスを当てる', false);

key.setCaretKey('M-w', function (ev) {
    goDoCommand('cmd_copy');
}, '選択中のテキストをコピー', true);

key.setCaretKey([["C-a"], ["^"]], function (ev) {
    goDoCommand("cmd_beginLine");
}, 'キャレットを行頭へ移動', false);

key.setCaretKey([["C-e"], ["$"]], function (ev) {
    goDoCommand("cmd_endLine");
}, 'キャレットを行末へ移動', false);

key.setCaretKey([["C-n"], ["j"]], function (ev) {
    goDoCommand("cmd_scrollLineDown");
}, 'キャレットを一行下へ', false);

key.setCaretKey([["C-p"], ["k"]], function (ev) {
    goDoCommand("cmd_scrollLineUp");
}, 'キャレットを一行上へ', false);

key.setCaretKey([["C-f"], ["l"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
}, 'キャレットを一文字右へ移動', false);

key.setCaretKey([["C-b"], ["h"], ["C-h"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
}, 'キャレットを一文字左へ移動', false);

key.setCaretKey([["M-f"], ["w"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
}, 'キャレットを一単語右へ移動', false);

key.setCaretKey([["M-b"], ["W"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
}, 'キャレットを一単語左へ移動', false);

key.setCaretKey([["C-v"], ["SPC"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
}, 'キャレットを一画面分下へ', false);

key.setCaretKey([["M-v"], ["b"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectPagePrevious") : goDoCommand("cmd_movePageUp");
}, 'キャレットを一画面分上へ', false);

key.setCaretKey([["M-<"], ["g"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectTop") : goDoCommand("cmd_scrollTop");
}, 'キャレットをページ先頭へ移動', false);

key.setCaretKey([["M->"], ["G"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'キャレットを行末へ移動', false);

key.setCaretKey('J', function (ev) {
    util.getSelectionController().scrollLine(true);
}, '画面を一行分下へスクロール', false);

key.setCaretKey('K', function (ev) {
    util.getSelectionController().scrollLine(false);
}, '画面を一行分上へスクロール', false);

key.setCaretKey(',', function (ev) {
    util.getSelectionController().scrollHorizontal(true);
    goDoCommand("cmd_scrollLeft");
}, '左へスクロール', false);

key.setCaretKey('.', function (ev) {
    goDoCommand("cmd_scrollRight");
    util.getSelectionController().scrollHorizontal(false);
}, '右へスクロール', false);

key.setCaretKey('z', function (ev) {
    command.recenter(ev);
}, 'キャレットの位置までスクロール', false);

key.setCaretKey([["C-`"], ["C-@"]], function (ev) {
    command.setMark(ev);
}, 'マークをセット', true);

key.setCaretKey(':', function (ev, arg) {
    shell.input(null, arg);
}, 'コマンドの実行', true);

key.setCaretKey('R', function (ev) {
    BrowserReload();
}, '更新', true);

key.setCaretKey('<backspace>', function (ev) {
    BrowserBack();
}, '戻る', false);

key.setCaretKey('F', function (ev) {
    BrowserForward();
}, '進む', false);

key.setCaretKey(["C-x", "h"], function (ev) {
    goDoCommand("cmd_selectAll");
}, 'すべて選択', true);

key.setCaretKey('I', function (ev) {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, '最初のインプットエリアへフォーカス', true);

key.setCaretKey('M-p', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, '次のボタンへフォーカスを当てる', false);

key.setCaretKey('M-n', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, '前のボタンへフォーカスを当てる', false);

// Hit a hint 用の設定

key.setViewKey('C-j', function (aEvent, aArg) {
    ext.exec("hok-start-foreground-mode", aArg);
}, 'Hit a Hint を開始', true);

key.setViewKey(['C-x', 'j'], function (aEvent, aArg) {
    ext.exec("hok-start-background-mode", aArg);
}, 'リンクをバックグラウンドで開く Hit a Hint を開始', true);

key.setViewKey(['C-x', ';'], function (aEvent, aArg) {
    ext.exec("hok-start-extended-mode", aArg);
}, 'HoK - 拡張ヒントモード', true);

key.setViewKey(['C-x', 'C-j'], function (aEvent, aArg) {
    ext.exec("hok-start-continuous-mode", aArg);
}, 'リンクを連続して開く Hit a Hint を開始', true);


// bmany設定(ブックマーク関連)

key.setViewKey(['C-x', 'b'], function (ev, arg) {
    ext.exec("bmany-list-all-bookmarks", arg, ev);
}, "bmany - ブックマークを一覧表示");

key.setViewKey(['C-x', 'B'], function (ev, arg) {
    ext.exec("bmany-list-bookmarklets", arg, ev);
}, "bmany - ブックマークレットを一覧表示");

key.setViewKey([':', 'k'], function (ev, arg) {
    ext.exec("bmany-list-bookmarks-with-keyword", arg, ev);
}, "bmany - キーワード付きブックマークを一覧表示");


// キャレットモードの設定

hook.addToHook('KeyBoardQuit', function (aEvent) {
    if (key.currentKeySequence.length) {
        return;
    }
    command.closeFindBar();
    var marked = command.marked(aEvent);
    if (util.isCaretEnabled()) {
        if (marked) {
            command.resetMark(aEvent);
        } else {
            if ("blur" in aEvent.target) {
                aEvent.target.blur();
            }
            util.setBoolPref("accessibility.browsewithcaret", false);
            gBrowser.focus();
            _content.focus();
        }
    } else {
        goDoCommand("cmd_selectNone");
    }
    if (KeySnail.windowType === "navigator:browser" && !marked) {
        key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
    }
});

key.setCaretKey(';', function (aEvent, aArg) {
    ext.exec('hok-start-extended-mode', aArg);
}, 'HoK - 拡張ヒントモードを開始', true);
