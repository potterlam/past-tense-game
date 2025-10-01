
        console.log('🎮 開始遊戲初始化...');
        
        // 音效管理器
        class AudioManager {
            constructor() {
                this.bgm = document.getElementById('bgmAudio');
                this.clickSound = document.getElementById('clickSound');
                this.correctSound = document.getElementById('correctSound');
                this.wrongSound = document.getElementById('wrongSound');
                this.isMuted = false;
                this.bgmVolume = 0.3;
                this.sfxVolume = 0.7;
                
                this.bgm.volume = this.bgmVolume;
                this.clickSound.volume = this.sfxVolume;
                this.correctSound.volume = this.sfxVolume;
                this.wrongSound.volume = this.sfxVolume;
            }
            
            playBGM() {
                if (!this.isMuted) {
                    this.bgm.currentTime = 0;
                    this.bgm.play().catch(e => console.log('BGM播放被阻擋'));
                }
            }
            
            stopBGM() {
                this.bgm.pause();
            }
            
            playClick() {
                if (!this.isMuted) {
                    this.clickSound.currentTime = 0;
                    this.clickSound.play().catch(e => {});
                }
            }
            
            playCorrect() {
                if (!this.isMuted) {
                    this.correctSound.currentTime = 0;
                    this.correctSound.play().catch(e => {});
                }
            }
            
            playWrong() {
                if (!this.isMuted) {
                    this.wrongSound.currentTime = 0;
                    this.wrongSound.play().catch(e => {});
                }
            }
            
            toggleMute() {
                this.isMuted = !this.isMuted;
                if (this.isMuted) {
                    this.bgm.volume = 0;
                } else {
                    this.bgm.volume = this.bgmVolume;
                }
            }
        }
        
        // 全域遊戲狀態
        window.gameState = {
            currentLanguage: 'zh',
            currentGame: null,
            currentScreen: 'loading',
            gameProgress: {
                wordSearch: { completed: false, unlocked: true },
                fallingWords: { completed: false, unlocked: false },
                multipleChoice: { completed: false, unlocked: false },
                bossFight: { completed: false, unlocked: false }
            },
            artifacts: { t: false, d: false, id: false },
            score: 0,
            initialized: false
        };
        
        // 全域音效管理器
        window.audioManager = new AudioManager();
        
        // 翻譯系統
        window.translations = {
            zh: {
                // 主選單
                gameTitle: "🎭 英語過去式發音冒險",
                startGame: "🚀 開始冒險",
                instructions: "📚 遊戲說明",
                credits: "🏆 製作團隊",
                languageToggle: "🌐 English",
                
                // 介紹
                introVideoTitle: "🎬 遊戲介紹",
                introVideoDesc: "觀看完整故事介紹或直接開始遊戲",
                skipIntro: "⏭️ 跳過介紹",
                startAdventure: "▶️ 開始遊戲",
                
                // 結束
                endingVideoTitle: "🎉 冒險完成！",
                endingVideoDesc: "您已成為真正的發音大師！",
                playAgain: "🔄 重新開始",
                backToMainMenu: "🏠 返回主選單",
                
                // 遊戲選單
                gameMenuTitle: "🎮 選擇你的挑戰",
                wsTitle: "🔍 橋樑修復",
                wsDesc: "修復古老的發音橋樑",
                fwTitle: "⚔️ 岩石法師戰",
                fwDesc: "擊敗邪惡岩石法師",
                mcTitle: "🧙‍♂️ 夢魘法師戰",
                mcDesc: "從催眠中醒來擊敗法師",
                bfTitle: "👑 最終Boss戰",
                bfDesc: "面對發音之王！",
                backToMenu: "🏠 返回主選單",
                
                // 遊戲內容
                bridgeRepair: "🌉 橋樑修復挑戰",
                selectSound: "選擇發音類型：",
                selectedWord: "選中的單詞：",
                confirm: "✅ 確認",
                clear: "🔄 清除",
                pronounce: "🔊 發音",
                foundWords: "已找到的單詞",
                
                // 戰鬥
                rockWizardBattle: "⚔️ 岩石法師戰",
                nightmareWizard: "🧙‍♂️ 夢魘法師戰",
                finalBoss: "👑 最終Boss戰",
                
                // 訊息
                correct: "✅ 正確！",
                wrong: "❌ 錯誤！",
                completed: "🎉 完成！",
                unlocked: "已解鎖",
                
                // 載入
                loadingTitle: "🎮 英語過去式發音冒險",
                loadingStatus: "正在初始化遊戲系統...",
                
                // 其他
                none: "無",
                pleaseSelect: "請選擇",
                sound: "音",
                
                // 遊戲2相關
                chooseSword: "選擇劍 (J/K/L):",
                currentSword: "當前劍:",
                movement: "移動 (W/A/S/D):",
                
                // 遊戲3相關
                consecutiveCorrect: "連續答對:",
                totalQuestions: "問題"
            },
            en: {
                // 主選單
                gameTitle: "🎭 English Past Tense Adventure",
                startGame: "🚀 Start Adventure",
                instructions: "📚 Instructions",
                credits: "🏆 Credits",
                languageToggle: "🌐 中文",
                
                // 介紹
                introVideoTitle: "🎬 Game Introduction",
                introVideoDesc: "Watch the full story introduction or start playing directly",
                skipIntro: "⏭️ Skip Intro",
                startAdventure: "▶️ Start Game",
                
                // 結束
                endingVideoTitle: "🎉 Adventure Complete!",
                endingVideoDesc: "You have become a true pronunciation master!",
                playAgain: "🔄 Play Again",
                backToMainMenu: "🏠 Back to Main Menu",
                
                // 遊戲選單
                gameMenuTitle: "🎮 Choose Your Challenge",
                wsTitle: "🔍 Bridge Repair",
                wsDesc: "Repair the ancient pronunciation bridge",
                fwTitle: "⚔️ Rock Wizard Battle",
                fwDesc: "Defeat the evil rock wizard",
                mcTitle: "🧙‍♂️ Nightmare Wizard",
                mcDesc: "Wake up from hypnosis and defeat the wizard",
                bfTitle: "👑 Final Boss Battle",
                bfDesc: "Face the Pronunciation King!",
                backToMenu: "🏠 Back to Menu",
                
                // 遊戲內容
                bridgeRepair: "🌉 Bridge Repair Challenge",
                selectSound: "Select pronunciation type:",
                selectedWord: "Selected word:",
                confirm: "✅ Confirm",
                clear: "🔄 Clear",
                pronounce: "🔊 Pronounce",
                foundWords: "Found words",
                
                // 戰鬥
                rockWizardBattle: "⚔️ Rock Wizard Battle",
                nightmareWizard: "🧙‍♂️ Nightmare Wizard Battle",
                finalBoss: "👑 Final Boss Battle",
                
                // 訊息
                correct: "✅ Correct!",
                wrong: "❌ Wrong!",
                completed: "🎉 Completed!",
                unlocked: "Unlocked",
                
                // 載入
                loadingTitle: "🎮 English Past Tense Adventure",
                loadingStatus: "Initializing game system...",
                
                // 其他
                none: "None",
                pleaseSelect: "Please select",
                sound: "sound",
                
                // 遊戲2相關
                chooseSword: "Choose Sword (J/K/L):",
                currentSword: "Current Sword:",
                movement: "Movement (W/A/S/D):",
                
                // 遊戲3相關
                consecutiveCorrect: "Consecutive correct:",
                totalQuestions: "Question"
            }
        };
        
        // 畫面管理器
        class ScreenManager {
            constructor() {
                this.screens = ['mainMenuScreen', 'storyScreen', 'gameMenuScreen', 'gameContainer', 'endingScreen'];
                this.currentScreen = null;
            }
            
            showScreen(screenId) {
                console.log(`📺 切換到畫面: ${screenId}`);
                
                // 隱藏所有畫面
                this.screens.forEach(id => {
                    const screen = document.getElementById(id);
                    if (screen) {
                        screen.classList.remove('active');
                    }
                });
                
                // 隱藏過場動畫
                document.getElementById('cutsceneContainer').classList.remove('active');
                
                // 顯示目標畫面
                const targetScreen = document.getElementById(screenId);
                if (targetScreen) {
                    targetScreen.classList.add('active');
                    this.currentScreen = screenId;
                    window.gameState.currentScreen = screenId;
                    console.log(`✅ 畫面 ${screenId} 現在處於活動狀態`);
                } else {
                    console.error(`❌ 找不到畫面 ${screenId}`);
                }
            }
            
            showCutscene(title, text, backgroundImage, characterImage, callback) {
                const cutscene = document.getElementById('cutsceneContainer');
                cutscene.style.backgroundImage = backgroundImage ? `url('${backgroundImage}')` : '';
                
                document.getElementById('cutsceneTitle').textContent = title;
                document.getElementById('cutsceneText').textContent = text;
                
                const characterEl = document.getElementById('cutsceneCharacter');
                if (characterImage) {
                    characterEl.style.backgroundImage = `url('${characterImage}')`;
                    characterEl.style.display = 'block';
                } else {
                    characterEl.style.display = 'none';
                }
                
                cutscene.classList.add('active');
                
                const continueBtn = document.getElementById('cutsceneContinue');
                continueBtn.onclick = () => {
                    window.audioManager.playClick();
                    cutscene.classList.remove('active');
                    if (callback) callback();
                };
            }
        }
        
        // 遊戲系統
        class GameSystem {
            constructor() {
                this.screenManager = new ScreenManager();
                this.currentVideo = null;
                this.init();
            }
            
            init() {
                console.log('🎮 遊戲系統初始化中');
                this.setupEventListeners();
                this.updateGameProgress();
                this.updateLanguage('zh');
                
                // 啟動BGM
                setTimeout(() => {
                    window.audioManager.playBGM();
                }, 1000);
            }
            
            setupEventListeners() {
                console.log('🔧 設置遊戲系統事件監聽器');
                
                // 為所有按鈕添加點擊音效
                document.addEventListener('click', (e) => {
                    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('clickable')) {
                        window.audioManager.playClick();
                    }
                });
                
                // 主選單按鈕
                document.getElementById('startGameBtn').onclick = () => this.showStory();
                document.getElementById('instructionsBtn').onclick = () => this.showInstructions();
                document.getElementById('creditsBtn').onclick = () => this.showCredits();
                
                // 故事控制
                document.getElementById('skipIntroBtn').onclick = () => this.skipVideo();
                document.getElementById('continueStoryBtn').onclick = () => this.continueFromVideo();
                
                // 結束畫面控制
                document.getElementById('playAgainBtn').onclick = () => this.resetGame();
                document.getElementById('backToMenuBtn').onclick = () => this.showMainMenu();
                
                // 遊戲選單
                document.getElementById('gameMenuBackBtn').onclick = () => this.showMainMenu();
                
                // 遊戲按鈕
                document.getElementById('wordSearchBtn').onclick = () => this.startGame('wordSearch');
                document.getElementById('fallingWordsBtn').onclick = () => this.startGame('fallingWords');
                document.getElementById('multipleChoiceBtn').onclick = () => this.startGame('multipleChoice');
                document.getElementById('bossFightBtn').onclick = () => this.startGame('bossFight');
                
                // 語言切換
                document.getElementById('languageToggle').onclick = () => this.toggleLanguage();
                
                // 影片事件
                this.currentVideo = document.getElementById('introVideo');
                if (this.currentVideo) {
                    this.currentVideo.onended = () => {
                        console.log('🎬 介紹影片播放完畢');
                        setTimeout(() => this.continueFromVideo(), 2000);
                    };
                }
                
                const endingVideo = document.getElementById('endingVideo');
                if (endingVideo) {
                    endingVideo.onended = () => {
                        console.log('🎉 結束影片播放完畢');
                    };
                }
            }
            
            showMainMenu() {
                console.log('📋 顯示主選單');
                this.stopAllVideos();
                this.screenManager.showScreen('mainMenuScreen');
                window.audioManager.playBGM();
            }
            
            showStory() {
                console.log('📖 顯示故事介紹');
                this.screenManager.showScreen('storyScreen');
                // 自動播放介紹影片
                setTimeout(() => {
                    if (this.currentVideo) {
                        this.currentVideo.currentTime = 0;
                        this.currentVideo.play().catch(e => {
                            console.log('影片自動播放被阻擋：', e);
                        });
                    }
                }, 500);
            }
            
            showEnding() {
                console.log('🎉 顯示結束畫面');
                this.screenManager.showScreen('endingScreen');
                // 自動播放結束影片
                setTimeout(() => {
                    const endingVideo = document.getElementById('endingVideo');
                    if (endingVideo) {
                        endingVideo.currentTime = 0;
                        endingVideo.play().catch(e => {
                            console.log('結束影片自動播放被阻擋：', e);
                        });
                    }
                }, 500);
            }
            
            stopAllVideos() {
                const videos = ['introVideo', 'endingVideo'];
                videos.forEach(videoId => {
                    const video = document.getElementById(videoId);
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
                console.log('🛑 所有影片已停止');
            }
            
            skipVideo() {
                console.log('⏭️ 跳過介紹影片');
                this.stopAllVideos();
                this.showGameMenu();
            }
            
            continueFromVideo() {
                console.log('▶️ 從影片繼續');
                this.stopAllVideos();
                this.showGameMenu();
            }
            
            resetGame() {
                console.log('🔄 重置遊戲');
                window.gameState = {
                    currentLanguage: window.gameState.currentLanguage,
                    currentGame: null,
                    currentScreen: 'loading',
                    gameProgress: {
                        wordSearch: { completed: false, unlocked: true },
                        fallingWords: { completed: false, unlocked: false },
                        multipleChoice: { completed: false, unlocked: false },
                        bossFight: { completed: false, unlocked: false }
                    },
                    artifacts: { t: false, d: false, id: false },
                    score: 0,
                    initialized: true
                };
                this.updateGameProgress();
                this.showMainMenu();
            }
            
            showGameMenu() {
                console.log('🎮 顯示遊戲選單');
                this.screenManager.showScreen('gameMenuScreen');
                this.updateGameProgress();
            }
            
            updateGameProgress() {
                console.log('📊 更新遊戲進度');
                
                const games = ['wordSearch', 'fallingWords', 'multipleChoice', 'bossFight'];
                games.forEach(gameId => {
                    const button = document.getElementById(gameId + 'Btn');
                    if (button) {
                        const progress = window.gameState.gameProgress[gameId];
                        
                        // 移除所有狀態類別
                        button.classList.remove('locked', 'completed');
                        
                        if (progress.completed) {
                            button.classList.add('completed');
                        } else if (!progress.unlocked) {
                            button.classList.add('locked');
                        }
                    }
                });
            }
            
            startGame(gameId) {
                const progress = window.gameState.gameProgress[gameId];
                
                if (!progress.unlocked) {
                    const message = window.gameState.currentLanguage === 'zh' ? '請先完成前面的遊戲才能解鎖！' : 'Please complete previous games to unlock!';
                    this.showMessage(message, 'warning');
                    return;
                }
                
                console.log(`🚀 開始遊戲: ${gameId}`);
                window.gameState.currentGame = gameId;
                
                // 顯示過場動畫
                this.showGameCutscene(gameId, () => {
                    // 顯示遊戲容器
                    this.screenManager.showScreen('gameContainer');
                    
                    // 載入遊戲內容
                    this.loadGameContent(gameId);
                });
            }
            
            showGameCutscene(gameId, callback) {
                let title, text, backgroundImage, characterImage;
                
                if (window.gameState.currentLanguage === 'zh') {
                    switch(gameId) {
                        case 'wordSearch':
                            title = '🌉 第一章：斷橋修復';
                            text = '古老的發音橋樑被邪惡法師破壞了！你必須找到正確的過去式單詞並按發音分類，才能修復橋樑繼續前進。';
                            backgroundImage = 'assets/images/cliff-background.jpg';
                            characterImage = 'assets/images/player-sprite.png';
                            break;
                        case 'fallingWords':
                            title = '⚔️ 第二章：岩石法師戰';
                            text = '邪惡的岩石法師用魔法石塊攻擊你！使用你的劍切開帶有正確發音的石塊，擊敗法師獲得發音神器。';
                            backgroundImage = 'assets/images/cliff-background.jpg';
                            characterImage = 'assets/images/warrior-sprite.png';
                            break;
                        case 'multipleChoice':
                            title = '🧙‍♂️ 第三章：夢魘法師戰';
                            text = '夢魘法師用催眠術迷惑了你的心智！你必須連續答對5題才能醒來並擊敗法師，奪取最後的神器。';
                            backgroundImage = 'assets/images/cave-background.jpg';
                            characterImage = 'assets/images/player-hypnotized.png';
                            break;
                        case 'bossFight':
                            title = '👑 最終章：發音之王';
                            text = '你已經收集齊所有三個發音神器！現在面對最終Boss - 發音之王。運用你掌握的所有發音知識擊敗他，成為真正的發音大師！';
                            backgroundImage = 'assets/images/boss-arena.jpg';
                            characterImage = 'assets/images/pronunciation-king.png';
                            break;
                    }
                } else {
                    switch(gameId) {
                        case 'wordSearch':
                            title = '🌉 Chapter 1: Bridge Repair';
                            text = 'The ancient pronunciation bridge has been destroyed by evil wizards! You must find the correct past tense words and classify them by pronunciation to repair the bridge and continue forward.';
                            backgroundImage = 'assets/images/cliff-background.jpg';
                            characterImage = 'assets/images/player-sprite.png';
                            break;
                        case 'fallingWords':
                            title = '⚔️ Chapter 2: Rock Wizard Battle';
                            text = 'The evil rock wizard attacks you with magical stone blocks! Use your sword to slice through blocks with the correct pronunciation, defeat the wizard and obtain the pronunciation artifact.';
                            backgroundImage = 'assets/images/cliff-background.jpg';
                            characterImage = 'assets/images/warrior-sprite.png';
                            break;
                        case 'multipleChoice':
                            title = '🧙‍♂️ Chapter 3: Nightmare Wizard Battle';
                            text = 'The nightmare wizard has hypnotized your mind! You must answer 5 questions correctly in a row to wake up, defeat the wizard and seize the final artifact.';
                            backgroundImage = 'assets/images/cave-background.jpg';
                            characterImage = 'assets/images/player-hypnotized.png';
                            break;
                        case 'bossFight':
                            title = '👑 Final Chapter: Pronunciation King';
                            text = 'You have collected all three pronunciation artifacts! Now face the final boss - the Pronunciation King. Use all your pronunciation knowledge to defeat him and become a true pronunciation master!';
                            backgroundImage = 'assets/images/boss-arena.jpg';
                            characterImage = 'assets/images/pronunciation-king.png';
                            break;
                    }
                }
                
                this.screenManager.showCutscene(title, text, backgroundImage, characterImage, callback);
            }
            
            loadGameContent(gameId) {
                const gameContent = document.getElementById('gameContent');
                
                if (gameId === 'wordSearch') {
                    this.loadWordSearchGame(gameContent);
                } else if (gameId === 'fallingWords') {
                    this.loadFallingWordsGame(gameContent);
                } else if (gameId === 'multipleChoice') {
                    this.loadMultipleChoiceGame(gameContent);
                } else if (gameId === 'bossFight') {
                    this.loadBossFightGame(gameContent);
                }
            }
            
            loadWordSearchGame(container) {
                console.log('🔍 載入單詞搜索遊戲');
                const t = window.translations[window.gameState.currentLanguage];
                
                container.style.backgroundImage = 'url("assets/images/cliff-background.jpg")';
                
                container.innerHTML = `
                    <div style="min-height: 100vh; color: white; padding: 20px; background: rgba(0,0,0,0.3); backdrop-filter: blur(5px);">
                        <h1 style="text-align: center; font-size: 2.5em; margin-bottom: 20px;">${t.bridgeRepair}</h1>
                        
                        <!-- 進度顯示 -->
                        <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
                            <div style="text-align: center; min-width: 100px;">
                                <div style="color: #3498db; font-weight: bold; margin-bottom: 5px;">/t/ ${t.sound}</div>
                                <div style="width: 80px; height: 12px; background: rgba(255,255,255,0.2); border-radius: 6px; margin: 0 auto; overflow: hidden;">
                                    <div id="progressT" style="width: 0%; height: 100%; background: #3498db; border-radius: 6px; transition: width 0.5s;"></div>
                                </div>
                                <div id="countT" style="font-size: 12px; margin-top: 5px;">0/3</div>
                            </div>
                            <div style="text-align: center; min-width: 100px;">
                                <div style="color: #e74c3c; font-weight: bold; margin-bottom: 5px;">/d/ ${t.sound}</div>
                                <div style="width: 80px; height: 12px; background: rgba(255,255,255,0.2); border-radius: 6px; margin: 0 auto; overflow: hidden;">
                                    <div id="progressD" style="width: 0%; height: 100%; background: #e74c3c; border-radius: 6px; transition: width 0.5s;"></div>
                                </div>
                                <div id="countD" style="font-size: 12px; margin-top: 5px;">0/3</div>
                            </div>
                            <div style="text-align: center; min-width: 100px;">
                                <div style="color: #2ecc71; font-weight: bold; margin-bottom: 5px;">/ɪd/ ${t.sound}</div>
                                <div style="width: 80px; height: 12px; background: rgba(255,255,255,0.2); border-radius: 6px; margin: 0 auto; overflow: hidden;">
                                    <div id="progressID" style="width: 0%; height: 100%; background: #2ecc71; border-radius: 6px; transition: width 0.5s;"></div>
                                </div>
                                <div id="countID" style="font-size: 12px; margin-top: 5px;">0/3</div>
                            </div>
                        </div>
                        
                        <!-- 發音選擇 -->
                        <div style="text-align: center; margin-bottom: 20px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; backdrop-filter: blur(10px);">
                            <div style="margin-bottom: 15px; font-size: 16px; font-weight: bold;">${t.selectSound}</div>
                            <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                                <button class="sound-btn" data-sound="t" style="background: #3498db;">🔵 /t/ ${t.sound}</button>
                                <button class="sound-btn" data-sound="d" style="background: #e74c3c;">🔴 /d/ ${t.sound}</button>
                                <button class="sound-btn" data-sound="id" style="background: #2ecc71;">🟢 /ɪd/ ${t.sound}</button>
                            </div>
                            <div style="margin-top: 10px; font-size: 14px;">
                                ${window.gameState.currentLanguage === 'zh' ? '當前選擇:' : 'Selected:'} <span id="selectedSound" style="color: #fbbf24; font-weight: bold;">${t.pleaseSelect}</span>
                            </div>
                        </div>
                        
                        <!-- 字母網格 -->
                        <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                            <div id="letterGrid"></div>
                        </div>
                        
                        <!-- 控制區域 -->
                        <div style="text-align: center; margin-bottom: 20px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; backdrop-filter: blur(10px);">
                            <div style="margin-bottom: 15px; font-size: 16px;">
                                ${t.selectedWord} <span id="selectedWord" style="color: #fbbf24; font-weight: bold; font-size: 18px;">${t.none}</span>
                            </div>
                            <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                                <button id="confirmBtn" class="control-btn" style="background: #4ecca3;" disabled>${t.confirm}</button>
                                <button id="clearBtn" class="control-btn" style="background: #f39c12;">${t.clear}</button>
                                <button id="pronounceBtn" class="control-btn" style="background: #9b59b6;" disabled>${t.pronounce}</button>
                                <button onclick="window.gameSystem.showGameMenu()" class="control-btn" style="background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.5);">${t.backToMenu}</button>
                            </div>
                        </div>
                        
                        <!-- 已找到的單詞 -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 600px; margin: 0 auto;">
                            <div style="background: rgba(52, 152, 219, 0.2); padding: 15px; border-radius: 10px; border: 2px solid #3498db; backdrop-filter: blur(10px);">
                                <h4 style="color: #3498db; margin: 0 0 10px 0; text-align: center;">🔵 /t/ ${t.foundWords}</h4>
                                <div id="foundWordsT" style="min-height: 60px;"></div>
                            </div>
                            <div style="background: rgba(231, 76, 60, 0.2); padding: 15px; border-radius: 10px; border: 2px solid #e74c3c; backdrop-filter: blur(10px);">
                                <h4 style="color: #e74c3c; margin: 0 0 10px 0; text-align: center;">🔴 /d/ ${t.foundWords}</h4>
                                <div id="foundWordsD" style="min-height: 60px;"></div>
                            </div>
                            <div style="background: rgba(46, 204, 113, 0.2); padding: 15px; border-radius: 10px; border: 2px solid #2ecc71; backdrop-filter: blur(10px);">
                                <h4 style="color: #2ecc71; margin: 0 0 10px 0; text-align: center;">🟢 /ɪd/ ${t.foundWords}</h4>
                                <div id="foundWordsID" style="min-height: 60px;"></div>
                            </div>
                        </div>
                    </div>
                `;
                
                this.setupWordSearchGame();
            }
            
            loadFallingWordsGame(container) {
                console.log('⚔️ 載入岩石法師戰');
                const t = window.translations[window.gameState.currentLanguage];
                
                container.className = 'game-container game-area-2';
                
                container.innerHTML = `
                    <div style="min-height: 100vh; color: white; padding: 20px; position: relative; background: rgba(0,0,0,0.3); backdrop-filter: blur(5px);">
                        <h1 style="text-align: center; font-size: 2.5em; margin-bottom: 20px;">${t.rockWizardBattle}</h1>
                        
                        <!-- 遊戲HUD -->
                        <div class="game-hud">
                            <div style="display: flex; gap: 20px; align-items: center;">
                                <div style="text-align: center;">
                                    <div style="color: #4ecca3; font-size: 16px; font-weight: bold;">${window.gameState.currentLanguage === 'zh' ? '得分' : 'Score'}</div>
                                    <div id="fallingScore" style="font-size: 24px;">0</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="color: #f39c12; font-size: 16px; font-weight: bold;">${window.gameState.currentLanguage === 'zh' ? '時間' : 'Time'}</div>
                                    <div id="fallingTime" style="font-size: 24px;">90</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="color: #e74c3c; font-size: 16px; font-weight: bold;">${window.gameState.currentLanguage === 'zh' ? '生命' : 'Lives'}</div>
                                    <div id="fallingLives" style="font-size: 24px;">❤️❤️❤️</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 劍選擇HUD -->
                        <div class="sword-selection">
                            <div style="text-align: center; margin-bottom: 10px; font-size: 14px; font-weight: bold;">
                                ${t.chooseSword}
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <div class="sword-btn t-sword active" data-sword="t" data-key="j"></div>
                                <div class="sword-btn d-sword" data-sword="d" data-key="k"></div>
                                <div class="sword-btn id-sword" data-sword="id" data-key="l"></div>
                            </div>
                            <div style="text-align: center; margin-top: 5px; font-size: 12px; opacity: 0.8;">
                                J - /t/    K - /d/    L - /ɪd/
                            </div>
                        </div>
                        
                        <!-- 遊戲區域 -->
                        <div id="gameArea" style="position: relative; height: 500px; background: rgba(0,0,0,0.3); border-radius: 15px; margin: 50px auto; max-width: 600px; overflow: hidden; backdrop-filter: blur(10px);">
                            <!-- 玩家角色 -->
                            <div class="player-character" id="player">
                                <div class="sword-indicator sword-t" id="swordIndicator"></div>
                            </div>
                        </div>
                        
                        <!-- 控制說明 -->
                        <div style="text-align: center; margin: 20px 0; font-size: 14px; color: rgba(255,255,255,0.8); background: rgba(0,0,0,0.5); padding: 15px; border-radius: 10px; max-width: 600px; margin-left: auto; margin-right: auto;">
                            ${window.gameState.currentLanguage === 'zh' ? 'WASD移動玩家，JKL切換劍類型，點擊單詞攻擊' : 'WASD to move player, JKL to switch sword types, click words to attack'}
                        </div>
                        
                        <!-- 控制按鈕 -->
                        <div style="text-align: center; margin-top: 20px;">
                            <button id="startFallingBtn" style="background: #4ecca3; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; margin: 5px;">▶️ ${window.gameState.currentLanguage === 'zh' ? '開始戰鬥' : 'Start Battle'}</button>
                            <button id="pauseFallingBtn" style="background: #f39c12; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; margin: 5px;" disabled>⏸️ ${window.gameState.currentLanguage === 'zh' ? '暫停' : 'Pause'}</button>
                            <button onclick="window.gameSystem.showGameMenu()" style="background: rgba(255,255,255,0.2); color: white; border: 2px solid rgba(255,255,255,0.5); padding: 15px 30px; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; margin: 5px;">${t.backToMenu}</button>
                        </div>
                    </div>
                `;
                
                this.setupFallingWordsGame();
            }
            
            loadMultipleChoiceGame(container) {
                console.log('🧙‍♂️ 載入夢魘法師戰');
                const t = window.translations[window.gameState.currentLanguage];
                
                container.style.backgroundImage = 'url("assets/images/cave-background.jpg")';
                
                container.innerHTML = `
                    <div style="min-height: 100vh; color: white; padding: 20px; text-align: center; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px);">
                        <h1 style="font-size: 2.5em; margin-bottom: 20px;">${t.nightmareWizard}</h1>
                        
                        <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; max-width: 600px; margin: 0 auto; backdrop-filter: blur(10px);">
                            <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 20px;">
                                <div style="text-align: center;">
                                    <div style="color: #4ecca3; font-size: 18px; font-weight: bold;">${t.consecutiveCorrect}</div>
                                    <div id="mcStreak" style="font-size: 32px; color: #4ecca3;">0</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="color: #f39c12; font-size: 18px; font-weight: bold;">${t.totalQuestions}</div>
                                    <div id="mcCurrent" style="font-size: 32px; color: #f39c12;">1</div>
                                </div>
                            </div>
                            
                            <div id="mcWord" style="font-size: 48px; margin: 30px 0; color: #4ecca3; font-weight: bold;">PLAYED</div>
                            
                            <button id="mcPlayBtn" style="
                                background: #9b59b6; color: white; border: none; padding: 15px 30px; 
                                border-radius: 10px; font-size: 18px; margin-bottom: 30px; cursor: pointer;">
                                🔊 ${window.gameState.currentLanguage === 'zh' ? '播放發音' : 'Play Pronunciation'}
                            </button>
                            
                            <div style="display: grid; gap: 15px; margin-bottom: 30px;">
                                <button class="mc-option" data-answer="t" style="
                                    background: rgba(52, 152, 219, 0.2); border: 2px solid #3498db; color: white; 
                                    padding: 20px; border-radius: 10px; font-size: 18px; cursor: pointer; transition: all 0.3s;">
                                    🔵 /t/ ${t.sound} ${window.gameState.currentLanguage === 'zh' ? '(如: watched, kicked)' : '(e.g., watched, kicked)'}
                                </button>
                                <button class="mc-option" data-answer="d" style="
                                    background: rgba(231, 76, 60, 0.2); border: 2px solid #e74c3c; color: white; 
                                    padding: 20px; border-radius: 10px; font-size: 18px; cursor: pointer; transition: all 0.3s;">
                                    🔴 /d/ ${t.sound} ${window.gameState.currentLanguage === 'zh' ? '(如: played, lived)' : '(e.g., played, lived)'}
                                </button>
                                <button class="mc-option" data-answer="id" style="
                                    background: rgba(46, 204, 113, 0.2); border: 2px solid #2ecc71; color: white; 
                                    padding: 20px; border-radius: 10px; font-size: 18px; cursor: pointer; transition: all 0.3s;">
                                    🟢 /ɪd/ ${t.sound} ${window.gameState.currentLanguage === 'zh' ? '(如: wanted, needed)' : '(e.g., wanted, needed)'}
                                </button>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px;">
                            <button onclick="window.gameSystem.showGameMenu()" style="
                                background: rgba(255,255,255,0.2); color: white; border: 2px solid rgba(255,255,255,0.5); 
                                padding: 15px 30px; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer;">
                                ${t.backToMenu}
                            </button>
                        </div>
                    </div>
                `;
                
                this.setupMultipleChoiceGame();
            }
            
            loadBossFightGame(container) {
                console.log('👑 載入最終Boss戰');
                const t = window.translations[window.gameState.currentLanguage];
                
                container.className = 'game-container boss-arena';
                
                container.innerHTML = `
                    <div style="padding: 20px; text-align: center; background: rgba(0,0,0,0.3); min-height: 100vh;">
                        <h1 style="font-size: 2.5em; margin-bottom: 20px; color: #fbbf24;">${t.finalBoss}</h1>
                        
                        <!-- Boss角色 -->
                        <div class="boss-character" id="bossCharacter"></div>
                        
                        <!-- Boss血量 -->
                        <div class="boss-health">
                            <div class="boss-health-bar" id="bossHealthBar"></div>
                        </div>
                        
                        <!-- 神器顯示 -->
                        <div style="position: absolute; top: 100px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px;">
                            <div class="artifact t-artifact" id="tArtifact" style="display: ${window.gameState.artifacts.t ? 'flex' : 'none'};"></div>
                            <div class="artifact d-artifact" id="dArtifact" style="display: ${window.gameState.artifacts.d ? 'flex' : 'none'};"></div>
                            <div class="artifact id-artifact" id="idArtifact" style="display: ${window.gameState.artifacts.id ? 'flex' : 'none'};"></div>
                        </div>
                        
                        <!-- 戰鬥狀態 -->
                        <div style="position: absolute; bottom: 200px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); padding: 20px; border-radius: 15px; min-width: 400px; backdrop-filter: blur(10px);">
                            <div id="bossPhase" style="font-size: 24px; font-weight: bold; margin-bottom: 15px; color: #fbbf24;">${window.gameState.currentLanguage === 'zh' ? '第一階段' : 'Phase 1'}</div>
                            <div id="bossChallenge" style="font-size: 18px; margin-bottom: 20px;">
                                ${window.gameState.currentLanguage === 'zh' ? '在30秒內找到5個/t/音單詞！' : 'Find 5 /t/ sound words in 30 seconds!'}
                            </div>
                            <div style="display: flex; justify-content: space-around; margin-bottom: 15px;">
                                <div style="text-align: center;">
                                    <div style="color: #4ecca3; font-size: 18px; font-weight: bold;">${window.gameState.currentLanguage === 'zh' ? '進度' : 'Progress'}</div>
                                    <div id="bossProgress" style="font-size: 24px;">0/5</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="color: #f39c12; font-size: 18px; font-weight: bold;">${window.gameState.currentLanguage === 'zh' ? '時間' : 'Time'}</div>
                                    <div id="bossTimer" style="font-size: 24px;">30</div>
                                </div>
                            </div>
                            <button id="startBossBtn" style="background: linear-gradient(45deg, #4ecca3, #2ecc71); color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer;">
                                ⚔️ ${window.gameState.currentLanguage === 'zh' ? '開始最終戰' : 'Start Final Battle'}
                            </button>
                        </div>
                        
                        <!-- Boss戰鬥區域 -->
                        <div id="bossGameArea" style="position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); width: 500px; height: 100px; display: none;">
                            <!-- 動態生成的戰鬥元素 -->
                        </div>
                        
                        <div style="position: absolute; bottom: 20px; right: 20px;">
                            <button onclick="window.gameSystem.showGameMenu()" style="
                                background: rgba(255,255,255,0.2); color: white; border: 2px solid rgba(255,255,255,0.5); 
                                padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                                ${t.backToMenu}
                            </button>
                        </div>
                    </div>
                `;
                
                this.setupBossFightGame();
            }
            
            setupWordSearchGame() {
                const wordSearchGame = new WordSearchGameLogic();
                wordSearchGame.startGame();
            }
            
            setupFallingWordsGame() {
                const fallingGame = new FallingWordsGameLogic();
                fallingGame.init();
            }
            
            setupMultipleChoiceGame() {
                const mcGame = new MultipleChoiceGameLogic();
                mcGame.init();
            }
            
            setupBossFightGame() {
                const bossGame = new BossFightGameLogic();
                bossGame.init();
            }
            
            completeGame(gameId) {
                console.log(`✅ 遊戲完成: ${gameId}`);
                window.gameState.gameProgress[gameId].completed = true;
                window.audioManager.playCorrect();
                
                // 給予神器
                if (gameId === 'wordSearch') {
                    window.gameState.artifacts.t = true;
                } else if (gameId === 'fallingWords') {
                    window.gameState.artifacts.d = true;
                } else if (gameId === 'multipleChoice') {
                    window.gameState.artifacts.id = true;
                }
                
                // 解鎖下一個遊戲
                const gameOrder = ['wordSearch', 'fallingWords', 'multipleChoice', 'bossFight'];
                const currentIndex = gameOrder.indexOf(gameId);
                if (currentIndex >= 0 && currentIndex < gameOrder.length - 1) {
                    const nextGame = gameOrder[currentIndex + 1];
                    window.gameState.gameProgress[nextGame].unlocked = true;
                    console.log(`🔓 已解鎖: ${nextGame}`);
                    
                    this.showMessage(`🎉 ${window.gameState.currentLanguage === 'zh' ? '完成！已解鎖' : 'Completed! Unlocked'}: ${nextGame}!`, 'success', 4000);
                } else if (gameId === 'bossFight') {
                    // Boss戰完成，顯示結束影片
                    setTimeout(() => {
                        this.showEnding();
                    }, 3000);
                    return;
                }
                
                setTimeout(() => {
                    this.showGameMenu();
                }, 3000);
            }
            
            showInstructions() {
                const message = window.gameState.currentLanguage === 'zh' ? 
                    '找到過去式單詞並根據發音分類：/t/、/d/ 或 /ɪd/！' :
                    'Find past tense words and classify by pronunciation: /t/, /d/, or /ɪd/!';
                this.showMessage(message, 'info', 5000);
            }
            
            showCredits() {
                const message = window.gameState.currentLanguage === 'zh' ? 
                    '用 ❤️ 為英語學習冒險而製作！' :
                    'Made with ❤️ for English learning adventure!';
                this.showMessage(message, 'info', 3000);
            }
            
            toggleLanguage() {
                const newLang = window.gameState.currentLanguage === 'zh' ? 'en' : 'zh';
                this.updateLanguage(newLang);
            }
            
            updateLanguage(lang) {
                window.gameState.currentLanguage = lang;
                const t = window.translations[lang];
                
                console.log(`🌐 語言切換到: ${lang}`);
                
                // 更新所有UI元素
                document.getElementById('loadingTitle').textContent = t.loadingTitle;
                document.getElementById('gameTitle').textContent = t.gameTitle;
                document.getElementById('startGameBtn').textContent = t.startGame;
                document.getElementById('instructionsBtn').textContent = t.instructions;
                document.getElementById('creditsBtn').textContent = t.credits;
                document.getElementById('languageToggle').textContent = t.languageToggle;
                
                document.getElementById('introVideoTitle').textContent = t.introVideoTitle;
                document.getElementById('introVideoDesc').textContent = t.introVideoDesc;
                document.getElementById('skipIntroBtn').textContent = t.skipIntro;
                document.getElementById('continueStoryBtn').textContent = t.startAdventure;
                
                document.getElementById('endingVideoTitle').textContent = t.endingVideoTitle;
                document.getElementById('endingVideoDesc').textContent = t.endingVideoDesc;
                document.getElementById('playAgainBtn').textContent = t.playAgain;
                document.getElementById('backToMenuBtn').textContent = t.backToMainMenu;
                
                document.getElementById('gameMenuTitle').textContent = t.gameMenuTitle;
                document.getElementById('ws-title').textContent = t.wsTitle;
                document.getElementById('ws-desc').textContent = t.wsDesc;
                document.getElementById('fw-title').textContent = t.fwTitle;
                document.getElementById('fw-desc').textContent = t.fwDesc;
                document.getElementById('mc-title').textContent = t.mcTitle;
                document.getElementById('mc-desc').textContent = t.mcDesc;
                document.getElementById('bf-title').textContent = t.bfTitle;
                document.getElementById('bf-desc').textContent = t.bfDesc;
                document.getElementById('gameMenuBackBtn').textContent = t.backToMenu;
            }
            
            showMessage(text, type = 'success', duration = 3000) {
                const existing = document.querySelector('.message');
                if (existing) existing.remove();
                
                const message = document.createElement('div');
                message.className = `message ${type}`;
                message.textContent = text;
                document.body.appendChild(message);
                
                // 播放對應音效
                if (type === 'success') {
                    window.audioManager.playCorrect();
                } else if (type === 'error') {
                    window.audioManager.playWrong();
                } else {
                    window.audioManager.playClick();
                }
                
                setTimeout(() => {
                    if (message.parentNode) {
                        message.style.opacity = '0';
                        setTimeout(() => {
                            if (message.parentNode) message.parentNode.removeChild(message);
                        }, 300);
                    }
                }, duration);
            }
        }
        
        // 單詞搜索遊戲邏輯（修復：允許重複選擇字母）
        class WordSearchGameLogic {
            constructor() {
                this.selectedSound = null;
                this.selectedCells = [];
                this.foundWords = { t: [], d: [], id: [] };
                this.progress = { t: 0, d: 0, id: 0 };
                this.boardSize = 12;
                this.gameBoard = [];
                this.isSelecting = false;
                this.startCell = null;
                
                this.wordDatabase = {
                    t: ['WATCHED', 'KICKED', 'HELPED', 'WORKED', 'WASHED', 'PASSED', 'CROSSED', 'DANCED'],
                    d: ['PLAYED', 'LIVED', 'MOVED', 'LOVED', 'OPENED', 'CLOSED', 'TURNED', 'LEARNED'],
                    id: ['WANTED', 'NEEDED', 'DECIDED', 'STARTED', 'ENDED', 'VISITED', 'CREATED', 'PAINTED']
                };
                
                this.targetWords = [];
                this.foundWordPositions = []; // 記錄已找到單詞的位置
            }
            
            startGame() {
                console.log('🎮 開始單詞搜索遊戲邏輯');
                this.generateBoard();
                this.renderBoard();
                this.setupControls();
            }
            
            generateBoard() {
                this.gameBoard = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(''));
                
                Object.keys(this.wordDatabase).forEach(type => {
                    this.wordDatabase[type].slice(0, 4).forEach(word => {
                        this.targetWords.push({ word, type });
                    });
                });
                
                let placedCount = 0;
                this.targetWords.forEach(wordObj => {
                    if (this.placeWord(wordObj.word)) {
                        placedCount++;
                    }
                });
                
                for (let row = 0; row < this.boardSize; row++) {
                    for (let col = 0; col < this.boardSize; col++) {
                        if (this.gameBoard[row][col] === '') {
                            this.gameBoard[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        }
                    }
                }
                
                console.log(`✅ 棋盤生成完成，成功放置 ${placedCount} 個單詞`);
            }
            
            placeWord(word) {
                // 僅使用4個方向：左右上下
                const directions = [
                    [0, 1],   // 水平向右
                    [0, -1],  // 水平向左
                    [1, 0],   // 垂直向下
                    [-1, 0]   // 垂直向上
                ];
                
                for (let attempt = 0; attempt < 100; attempt++) {
                    const dir = directions[Math.floor(Math.random() * directions.length)];
                    const row = Math.floor(Math.random() * this.boardSize);
                    const col = Math.floor(Math.random() * this.boardSize);
                    
                    if (this.canPlaceWord(word, row, col, dir)) {
                        for (let i = 0; i < word.length; i++) {
                            const r = row + dir[0] * i;
                            const c = col + dir[1] * i;
                            this.gameBoard[r][c] = word[i];
                        }
                        return true;
                    }
                }
                return false;
            }
            
            canPlaceWord(word, row, col, dir) {
                for (let i = 0; i < word.length; i++) {
                    const r = row + dir[0] * i;
                    const c = col + dir[1] * i;
                    
                    if (r < 0 || r >= this.boardSize || c < 0 || c >= this.boardSize) return false;
                    if (this.gameBoard[r][c] !== '' && this.gameBoard[r][c] !== word[i]) return false;
                }
                return true;
            }
            
            renderBoard() {
                const grid = document.getElementById('letterGrid');
                grid.innerHTML = '';
                
                for (let row = 0; row < this.boardSize; row++) {
                    for (let col = 0; col < this.boardSize; col++) {
                        const cell = document.createElement('div');
                        cell.className = 'letter-cell';
                        cell.textContent = this.gameBoard[row][col];
                        cell.dataset.row = row;
                        cell.dataset.col = col;
                        
                        // 改進的拖拽選擇
                        cell.addEventListener('mousedown', (e) => this.startSelection(row, col, e));
                        cell.addEventListener('mouseenter', (e) => this.continueSelection(row, col, e));
                        cell.addEventListener('mouseup', (e) => this.endSelection(row, col, e));
                        
                        grid.appendChild(cell);
                    }
                }
                
                // 添加全域事件監聽
                document.addEventListener('mouseup', () => this.endSelection());
                
                console.log(`✅ 棋盤渲染完成`);
            }
            
            startSelection(row, col, e) {
                e.preventDefault();
                this.isSelecting = true;
                this.startCell = { row, col };
                this.clearSelection();
                this.selectCell(row, col);
                window.audioManager.playClick();
            }
            
            continueSelection(row, col, e) {
                if (!this.isSelecting) return;
                
                // 選擇從起始點到當前點的直線（僅水平或垂直）
                this.clearSelection();
                this.selectLine(this.startCell, { row, col });
            }
            
            endSelection(row, col, e) {
                this.isSelecting = false;
            }
            
            selectLine(start, end) {
                const dx = end.col - start.col;
                const dy = end.row - start.row;
                
                // 僅允許水平或垂直選擇
                if (Math.abs(dx) > 0 && Math.abs(dy) > 0) {
                    // 如果是斜線，選擇主要方向
                    if (Math.abs(dx) > Math.abs(dy)) {
                        end.row = start.row; // 水平
                    } else {
                        end.col = start.col; // 垂直
                    }
                }
                
                const distance = Math.max(Math.abs(end.col - start.col), Math.abs(end.row - start.row));
                
                if (distance === 0) {
                    this.selectCell(start.row, start.col);
                    return;
                }
                
                const stepX = end.col === start.col ? 0 : (end.col - start.col) / distance;
                const stepY = end.row === start.row ? 0 : (end.row - start.row) / distance;
                
                for (let i = 0; i <= distance; i++) {
                    const row = start.row + Math.round(stepY * i);
                    const col = start.col + Math.round(stepX * i);
                    
                    if (row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize) {
                        this.selectCell(row, col);
                    }
                }
            }
            
            selectCell(row, col) {
                // 修復：允許選擇任何字母，無論是否已經是某個單詞的一部分
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    cell.classList.add('selected');
                    this.selectedCells.push({ row, col });
                }
                this.updateSelectedWord();
            }
            
            setupControls() {
                document.querySelectorAll('.sound-btn').forEach(btn => {
                    btn.onclick = () => {
                        document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        this.selectedSound = btn.dataset.sound;
                        
                        const t = window.translations[window.gameState.currentLanguage];
                        const soundNames = { 
                            t: `/t/ ${t.sound}`, 
                            d: `/d/ ${t.sound}`, 
                            id: `/ɪd/ ${t.sound}` 
                        };
                        document.getElementById('selectedSound').textContent = soundNames[this.selectedSound];
                        window.audioManager.playClick();
                    };
                });
                
                document.getElementById('confirmBtn').onclick = () => this.confirmWord();
                document.getElementById('clearBtn').onclick = () => this.clearSelection();
                document.getElementById('pronounceBtn').onclick = () => this.pronounceWord();
            }
            
            updateSelectedWord() {
                const word = this.selectedCells.map(cell => this.gameBoard[cell.row][cell.col]).join('');
                const t = window.translations[window.gameState.currentLanguage];
                document.getElementById('selectedWord').textContent = word || t.none;
                
                const confirmBtn = document.getElementById('confirmBtn');
                const pronounceBtn = document.getElementById('pronounceBtn');
                
                if (word.length >= 3) {
                    confirmBtn.disabled = false;
                    pronounceBtn.disabled = false;
                } else {
                    confirmBtn.disabled = true;
                    pronounceBtn.disabled = true;
                }
            }
            
            confirmWord() {
                if (!this.selectedSound) {
                    const message = window.gameState.currentLanguage === 'zh' ? '請先選擇發音類型！' : 'Please select a pronunciation type first!';
                    window.gameSystem.showMessage(message, 'warning');
                    return;
                }
                
                const word = this.selectedCells.map(cell => this.gameBoard[cell.row][cell.col]).join('');
                const wordObj = this.targetWords.find(w => w.word === word);
                const t = window.translations[window.gameState.currentLanguage];
                
                if (wordObj && wordObj.type === this.selectedSound && !this.foundWords[wordObj.type].includes(word)) {
                    this.foundWords[wordObj.type].push(word);
                    this.progress[wordObj.type]++;
                    
                    // 記錄找到的單詞位置
                    this.foundWordPositions.push({
                        word: word,
                        cells: [...this.selectedCells]
                    });
                    
                    // 添加單詞找到的動畫效果
                    this.selectedCells.forEach(cell => {
                        const cellEl = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
                        cellEl.classList.add('word-found');
                        cellEl.classList.remove('selected');
                        // 給已找到的單詞加上特殊樣式，但仍然可以選擇
                        cellEl.classList.add('part-of-word');
                    });
                    
                    const listEl = document.getElementById(`foundWords${wordObj.type.toUpperCase()}`);
                    const wordEl = document.createElement('div');
                    wordEl.className = 'word-item found';
                    wordEl.textContent = word.toLowerCase();
                    listEl.appendChild(wordEl);
                    
                    this.updateProgress(wordObj.type);
                    
                    const message = `${t.correct} ${word.toLowerCase()} ${window.gameState.currentLanguage === 'zh' ? '是' : 'is'} /${wordObj.type}/ ${t.sound}`;
                    window.gameSystem.showMessage(message, 'success');
                    
                    if (this.progress.t >= 3 && this.progress.d >= 3 && this.progress.id >= 3) {
                        setTimeout(() => {
                            const winMessage = window.gameState.currentLanguage === 'zh' ? '🎉 橋樑修復完成！遊戲通關！' : '🎉 Bridge repaired! Game completed!';
                            window.gameSystem.showMessage(winMessage, 'success', 4000);
                            window.gameSystem.completeGame('wordSearch');
                        }, 1000);
                    }
                } else if (wordObj && this.foundWords[wordObj.type].includes(word)) {
                    const message = window.gameState.currentLanguage === 'zh' ? '這個單詞已經找過了！' : 'This word has already been found!';
                    window.gameSystem.showMessage(message, 'warning');
                } else {
                    const message = window.gameState.currentLanguage === 'zh' ? `${t.wrong} 請再試一次。` : `${t.wrong} Please try again.`;
                    window.gameSystem.showMessage(message, 'error');
                }
                
                this.clearSelection();
            }
            
            updateProgress(type) {
                const count = this.progress[type];
                const percentage = (count / 3) * 100;
                const progressBar = document.getElementById(`progress${type.toUpperCase()}`);
                const countEl = document.getElementById(`count${type.toUpperCase()}`);
                
                if (progressBar) progressBar.style.width = `${percentage}%`;
                if (countEl) countEl.textContent = `${count}/3`;
            }
            
            clearSelection() {
                document.querySelectorAll('.letter-cell.selected').forEach(cell => {
                    cell.classList.remove('selected');
                });
                this.selectedCells = [];
                this.updateSelectedWord();
            }
            
            pronounceWord() {
                const word = this.selectedCells.map(cell => this.gameBoard[cell.row][cell.col]).join('').toLowerCase();
                if (word && window.speechSynthesis) {
                    const utterance = new SpeechSynthesisUtterance(word);
                    utterance.lang = 'en-US';
                    utterance.rate = 0.8;
                    window.speechSynthesis.speak(utterance);
                }
            }
        }
        
        // 落字遊戲邏輯（改進的WASD + JKL版本）
        class FallingWordsGameLogic {
            constructor() {
                this.isPlaying = false;
                this.isPaused = false;
                this.score = 0;
                this.lives = 3;
                this.timeLeft = 90;
                this.currentSword = 't';
                this.fallingWords = [];
                this.gameTimer = null;
                this.spawnTimer = null;
                this.gameArea = null;
                this.player = null;
                this.playerX = 270; // 玩家X位置
                
                this.wordDatabase = {
                    t: ['watched', 'kicked', 'helped', 'worked', 'washed', 'passed', 'crossed', 'danced'],
                    d: ['played', 'lived', 'moved', 'loved', 'opened', 'closed', 'turned', 'learned'],
                    id: ['wanted', 'needed', 'decided', 'started', 'ended', 'visited', 'created', 'painted']
                };
            }
            
            init() {
                this.gameArea = document.getElementById('gameArea');
                this.player = document.getElementById('player');
                
                document.getElementById('startFallingBtn').onclick = () => this.startGame();
                document.getElementById('pauseFallingBtn').onclick = () => this.togglePause();
                
                // 劍選擇按鈕
                document.querySelectorAll('.sword-btn').forEach(btn => {
                    btn.onclick = () => this.selectSword(btn.dataset.sword);
                });
                
                // 鍵盤控制
                document.addEventListener('keydown', (e) => {
                    if (!this.isPlaying || this.isPaused) return;
                    
                    const key = e.key.toLowerCase();
                    
                    // WASD移動
                    if (key === 'w') {
                        // W鍵向上攻擊（攻擊上方的單詞）
                        this.attackDirection('up');
                    } else if (key === 'a') {
                        this.movePlayer(-40);
                    } else if (key === 's') {
                        // S鍵向下攻擊（攻擊下方的單詞）
                        this.attackDirection('down');
                    } else if (key === 'd') {
                        this.movePlayer(40);
                    }
                    // JKL劍選擇
                    else if (key === 'j') {
                        this.selectSword('t');
                    } else if (key === 'k') {
                        this.selectSword('d');
                    } else if (key === 'l') {
                        this.selectSword('id');
                    }
                    
                    e.preventDefault();
                });
                
                // 點擊控制
                this.gameArea.onclick = (e) => {
                    if (!this.isPlaying || this.isPaused) return;
                    
                    const rect = this.gameArea.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    
                    // 移動玩家到點擊位置
                    this.playerX = Math.max(40, Math.min(560, clickX));
                    this.player.style.left = this.playerX + 'px';
                    
                    // 自動攻擊
                    this.attackNearbyWords();
                };
                
                // 初始化劍選擇
                this.selectSword('t');
            }
            
            selectSword(swordType) {
                this.currentSword = swordType;
                
                // 更新按鈕樣式
                document.querySelectorAll('.sword-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`.sword-btn.${swordType}-sword`).classList.add('active');
                
                // 更新劍指示器
                const indicator = document.getElementById('swordIndicator');
                indicator.className = `sword-indicator sword-${swordType}`;
                
                window.audioManager.playClick();
            }
            
            movePlayer(direction) {
                this.playerX = Math.max(40, Math.min(560, this.playerX + direction));
                this.player.style.left = this.playerX + 'px';
            }
            
            startGame() {
                this.isPlaying = true;
                this.isPaused = false;
                this.score = 0;
                this.lives = 3;
                this.timeLeft = 90;
                this.fallingWords = [];
                this.playerX = 270;
                this.player.style.left = this.playerX + 'px';
                
                document.getElementById('startFallingBtn').disabled = true;
                document.getElementById('pauseFallingBtn').disabled = false;
                
                this.gameTimer = setInterval(() => this.updateGame(), 1000/60);
                this.spawnTimer = setInterval(() => this.spawnWord(), 1200); // 更快的生成速度
                
                console.log('⚔️ 岩石法師戰開始');
            }
            
            updateGame() {
                if (this.isPaused) return;
                
                this.timeLeft -= 1/60;
                
                document.getElementById('fallingTime').textContent = Math.ceil(this.timeLeft);
                document.getElementById('fallingScore').textContent = this.score;
                
                // 更新生命顯示
                let livesText = '';
                for (let i = 0; i < this.lives; i++) {
                    livesText += '❤️';
                }
                document.getElementById('fallingLives').textContent = livesText;
                
                // 更新落字
                for (let i = this.fallingWords.length - 1; i >= 0; i--) {
                    const word = this.fallingWords[i];
                    const currentTop = parseInt(word.element.style.top) || 0;
                    word.element.style.top = (currentTop + word.speed) + 'px';
                    
                    // 檢查是否到達底部
                    if (currentTop > 450) {
                        this.lives--;
                        word.element.remove();
                        this.fallingWords.splice(i, 1);
                        
                        if (this.lives <= 0) {
                            this.endGame();
                            return;
                        }
                    }
                }
                
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
                
                // 檢查勝利條件
                if (this.score >= 200) {
                    this.winGame();
                }
            }
            
            spawnWord() {
                if (!this.isPlaying || this.isPaused) return;
                
                const types = ['t', 'd', 'id'];
                const randomType = types[Math.floor(Math.random() * types.length)];
                const words = this.wordDatabase[randomType];
                const randomWord = words[Math.floor(Math.random() * words.length)];
                
                const wordElement = document.createElement('div');
                wordElement.className = `falling-word ${randomType}-type`;
                wordElement.textContent = randomWord;
                wordElement.style.left = Math.random() * 500 + 'px';
                wordElement.style.top = '-50px';
                wordElement.style.position = 'absolute';
                
                const wordData = {
                    element: wordElement,
                    text: randomWord,
                    type: randomType,
                    speed: 1.5 + Math.random() * 2
                };
                
                wordElement.onclick = () => this.hitWord(wordData);
                
                this.gameArea.appendChild(wordElement);
                this.fallingWords.push(wordData);
            }
            
            attackDirection(direction) {
                const playerRect = this.player.getBoundingClientRect();
                const gameAreaRect = this.gameArea.getBoundingClientRect();
                
                this.fallingWords.forEach((word, index) => {
                    const wordRect = word.element.getBoundingClientRect();
                    
                    // 計算相對位置
                    const wordX = wordRect.left - gameAreaRect.left;
                    const wordY = wordRect.top - gameAreaRect.top;
                    const playerGameX = playerRect.left - gameAreaRect.left;
                    const playerGameY = playerRect.top - gameAreaRect.top;
                    
                    let shouldAttack = false;
                    
                    if (direction === 'up' && wordY < playerGameY && Math.abs(wordX - playerGameX) < 60) {
                        shouldAttack = true;
                    } else if (direction === 'down' && wordY > playerGameY && Math.abs(wordX - playerGameX) < 60) {
                        shouldAttack = true;
                    }
                    
                    if (shouldAttack) {
                        this.hitWord(word, index);
                    }
                });
            }
            
            attackNearbyWords() {
                const playerRect = this.player.getBoundingClientRect();
                const gameAreaRect = this.gameArea.getBoundingClientRect();
                
                this.fallingWords.forEach((word, index) => {
                    const wordRect = word.element.getBoundingClientRect();
                    
                    if (Math.abs(wordRect.left - playerRect.left) < 80 && 
                        Math.abs(wordRect.top - playerRect.top) < 80) {
                        this.hitWord(word, index);
                    }
                });
            }
            
            hitWord(wordData, index = -1) {
                if (index === -1) {
                    index = this.fallingWords.indexOf(wordData);
                }
                
                if (wordData.type === this.currentSword) {
                    this.score += 20;
                    const message = window.gameState.currentLanguage === 'zh' ? '正確！ +20!' : 'Correct! +20!';
                    window.gameSystem.showMessage(message, 'success', 1000);
                } else {
                    this.score = Math.max(0, this.score - 10);
                    const message = window.gameState.currentLanguage === 'zh' ? '錯誤！ -10!' : 'Wrong! -10!';
                    window.gameSystem.showMessage(message, 'error', 1000);
                }
                
                // 創建爆炸效果
                const explosion = document.createElement('div');
                explosion.textContent = '💥';
                explosion.style.position = 'absolute';
                explosion.style.left = wordData.element.style.left;
                explosion.style.top = wordData.element.style.top;
                explosion.style.fontSize = '30px';
                explosion.style.zIndex = '1000';
                explosion.style.animation = 'fadeOut 1s ease-out forwards';
                explosion.style.pointerEvents = 'none';
                
                this.gameArea.appendChild(explosion);
                setTimeout(() => explosion.remove(), 1000);
                
                wordData.element.remove();
                if (index >= 0) {
                    this.fallingWords.splice(index, 1);
                }
            }
            
            togglePause() {
                this.isPaused = !this.isPaused;
                const pauseText = window.gameState.currentLanguage === 'zh' ? 
                    (this.isPaused ? '▶️ 繼續' : '⏸️ 暫停') :
                    (this.isPaused ? '▶️ Continue' : '⏸️ Pause');
                document.getElementById('pauseFallingBtn').textContent = pauseText;
            }
            
            endGame() {
                this.isPlaying = false;
                clearInterval(this.gameTimer);
                clearInterval(this.spawnTimer);
                
                document.getElementById('startFallingBtn').disabled = false;
                document.getElementById('pauseFallingBtn').disabled = true;
                
                if (this.score >= 200) {
                    this.winGame();
                } else {
                    const message = window.gameState.currentLanguage === 'zh' ? 
                        `遊戲結束！得分: ${this.score}` : 
                        `Game Over! Score: ${this.score}`;
                    window.gameSystem.showMessage(message, 'info');
                }
            }
            
            winGame() {
                const message = window.gameState.currentLanguage === 'zh' ? 
                    '🎉 擊敗岩石法師！神器獲得！' : 
                    '🎉 Rock wizard defeated! Artifact obtained!';
                window.gameSystem.showMessage(message, 'success');
                window.gameState.artifacts.d = true;
                window.gameSystem.completeGame('fallingWords');
            }
        }
        
        // 選擇題遊戲邏輯（修正版：5連對即勝利）
        class MultipleChoiceGameLogic {
            constructor() {
                this.currentQuestion = 0;
                this.consecutiveCorrect = 0;
                this.questions = [];
                
                this.wordDatabase = {
                    t: ['watched', 'kicked', 'helped', 'worked', 'washed', 'passed', 'crossed', 'danced', 'jumped', 'walked'],
                    d: ['played', 'lived', 'moved', 'loved', 'opened', 'closed', 'turned', 'learned', 'called', 'saved'],
                    id: ['wanted', 'needed', 'decided', 'started', 'ended', 'visited', 'created', 'painted', 'invited', 'selected']
                };
            }
            
            init() {
                this.generateQuestions();
                this.setupControls();
                this.showQuestion();
            }
            
            generateQuestions() {
                const allWords = [];
                Object.keys(this.wordDatabase).forEach(type => {
                    this.wordDatabase[type].forEach(word => {
                        allWords.push({ word, type });
                    });
                });
                
                // 生成足够的問題
                for (let i = 0; i < 20; i++) {
                    const randomIndex = Math.floor(Math.random() * allWords.length);
                    this.questions.push(allWords[randomIndex]);
                    allWords.splice(randomIndex, 1);
                }
            }
            
            setupControls() {
                document.getElementById('mcPlayBtn').onclick = () => this.playWordSound();
                
                document.querySelectorAll('.mc-option').forEach(btn => {
                    btn.onclick = () => this.selectAnswer(btn.dataset.answer);
                });
            }
            
            showQuestion() {
                if (this.consecutiveCorrect >= 5) {
                    this.winGame();
                    return;
                }
                
                if (this.currentQuestion >= this.questions.length) {
                    // 如果問題用完但還沒達到5連對，重新生成
                    this.generateQuestions();
                    this.currentQuestion = 0;
                }
                
                const question = this.questions[this.currentQuestion];
                
                document.getElementById('mcWord').textContent = question.word.toUpperCase();
                document.getElementById('mcCurrent').textContent = this.currentQuestion + 1;
                document.getElementById('mcStreak').textContent = this.consecutiveCorrect;
                
                // 重置選項樣式
                document.querySelectorAll('.mc-option').forEach(btn => {
                    btn.style.background = btn.style.background.replace('0.8', '0.2');
                    btn.disabled = false;
                });
                
                // 添加催眠效果（直到連對5次）
                if (this.consecutiveCorrect < 5) {
                    document.querySelector('.game-container').style.filter = 'sepia(100%) hue-rotate(280deg)';
                    
                    // 更新角色外觀
                    const playerSprites = document.querySelectorAll('.player-character');
                    playerSprites.forEach(sprite => {
                        sprite.classList.add('hypnotized');
                    });
                }
            }
            
            playWordSound() {
                const question = this.questions[this.currentQuestion];
                if (window.speechSynthesis) {
                    const utterance = new SpeechSynthesisUtterance(question.word);
                    utterance.lang = 'en-US';
                    utterance.rate = 0.8;
                    window.speechSynthesis.speak(utterance);
                }
            }
            
            selectAnswer(answer) {
                const question = this.questions[this.currentQuestion];
                const isCorrect = answer === question.type;
                
                document.querySelectorAll('.mc-option').forEach(btn => {
                    btn.disabled = true;
                    if (btn.dataset.answer === question.type) {
                        btn.style.background = btn.style.background.replace('0.2', '0.8');
                    }
                });
                
                if (isCorrect) {
                    this.consecutiveCorrect++;
                    const message = window.gameState.currentLanguage === 'zh' ? '正確！' : 'Correct!';
                    window.gameSystem.showMessage(message, 'success', 1500);
                    
                    // 檢查是否勝利
                    if (this.consecutiveCorrect >= 5) {
                        setTimeout(() => this.winGame(), 1500);
                        return;
                    }
                } else {
                    this.consecutiveCorrect = 0; // 重置連對計數
                    const correctAnswer = window.gameState.currentLanguage === 'zh' ? 
                        `錯誤！正確答案是 /${question.type}/ 音` : 
                        `Wrong! Correct answer is /${question.type}/ sound`;
                    window.gameSystem.showMessage(correctAnswer, 'error', 2000);
                }
                
                this.currentQuestion++;
                setTimeout(() => this.showQuestion(), 2500);
            }
            
            winGame() {
                // 解除催眠效果
                document.querySelector('.game-container').style.filter = 'none';
                
                // 恢復角色外觀
                const playerSprites = document.querySelectorAll('.player-character');
                playerSprites.forEach(sprite => {
                    sprite.classList.remove('hypnotized');
                });
                
                const victoryMessage = window.gameState.currentLanguage === 'zh' ? 
                    '🎉 連續答對5題！擊敗夢魘法師！最後的神器獲得！' : 
                    '🎉 5 consecutive correct! Nightmare wizard defeated! Final artifact obtained!';
                window.gameSystem.showMessage(victoryMessage, 'success', 4000);
                
                window.gameState.artifacts.id = true;
                window.gameSystem.completeGame('multipleChoice');
            }
        }
        
        // Boss戰遊戲邏輯（修正版：確保足夠的正確答案）
        class BossFightGameLogic {
            constructor() {
                this.bossHealth = 100;
                this.phase = 1;
                this.isActive = false;
                this.challenges = [
                    { type: 't', count: 5, time: 30 },
                    { type: 'd', count: 5, time: 25 },
                    { type: 'id', count: 5, time: 20 }
                ];
                this.currentChallenge = 0;
                this.progress = 0;
                this.timeLeft = 0;
                this.gameTimer = null;
                
                // 確保每種類型有足夠的單詞
                this.wordDatabase = {
                    t: ['watched', 'kicked', 'helped', 'worked', 'washed', 'passed', 'crossed', 'danced', 'jumped', 'walked', 'talked', 'asked', 'looked', 'cooked', 'booked'],
                    d: ['played', 'lived', 'moved', 'loved', 'opened', 'closed', 'turned', 'learned', 'called', 'saved', 'tried', 'died', 'cried', 'fried', 'dried'],
                    id: ['wanted', 'needed', 'decided', 'started', 'ended', 'visited', 'created', 'painted', 'invited', 'selected', 'collected', 'connected', 'protected', 'directed', 'elected']
                };
            }
            
            init() {
                document.getElementById('startBossBtn').onclick = () => this.startBattle();
                this.updateArtifacts();
            }
            
            updateArtifacts() {
                document.getElementById('tArtifact').style.display = window.gameState.artifacts.t ? 'flex' : 'none';
                document.getElementById('dArtifact').style.display = window.gameState.artifacts.d ? 'flex' : 'none';
                document.getElementById('idArtifact').style.display = window.gameState.artifacts.id ? 'flex' : 'none';
            }
            
            startBattle() {
                const artifactCount = Object.values(window.gameState.artifacts).filter(Boolean).length;
                
                if (artifactCount < 3) {
                    const artifactMessage = window.gameState.currentLanguage === 'zh' ? 
                        '你需要收集齊所有三個神器才能挑戰Boss！' : 
                        'You need to collect all three artifacts to challenge the Boss!';
                    window.gameSystem.showMessage(artifactMessage, 'warning');
                    return;
                }
                
                this.isActive = true;
                this.currentChallenge = 0;
                this.startPhase();
            }
            
            startPhase() {
                const challenge = this.challenges[this.currentChallenge];
                
                this.progress = 0;
                this.timeLeft = challenge.time;
                
                const phaseText = window.gameState.currentLanguage === 'zh' ? 
                    `第${this.currentChallenge + 1}階段` : 
                    `Phase ${this.currentChallenge + 1}`;
                document.getElementById('bossPhase').textContent = phaseText;
                
                const challengeText = window.gameState.currentLanguage === 'zh' ? 
                    `在${challenge.time}秒內找到${challenge.count}個/${challenge.type}/音單詞！` :
                    `Find ${challenge.count} /${challenge.type}/ sound words in ${challenge.time} seconds!`;
                document.getElementById('bossChallenge').textContent = challengeText;
                
                this.updateUI();
                this.startChallenge();
            }
            
            startChallenge() {
                const challenge = this.challenges[this.currentChallenge];
                
                this.gameTimer = setInterval(() => {
                    this.timeLeft--;
                    this.updateUI();
                    
                    if (this.timeLeft <= 0) {
                        this.failPhase();
                    }
                }, 1000);
                
                this.generateChallengeElements(challenge);
            }
            
            generateChallengeElements(challenge) {
                const gameArea = document.getElementById('bossGameArea');
                gameArea.style.display = 'block';
                gameArea.innerHTML = '';
                
                // 確保生成足夠的目標類型單詞
                const targetWords = this.wordDatabase[challenge.type].slice(0, challenge.count);
                const otherWords = [];
                
                // 添加其他類型的單詞作為干擾
                Object.keys(this.wordDatabase).forEach(type => {
                    if (type !== challenge.type) {
                        otherWords.push(...this.wordDatabase[type].slice(0, 3));
                    }
                });
                
                // 混合所有單詞
                const allWords = [
                    ...targetWords.map(word => ({ word, type: challenge.type })),
                    ...otherWords.map(word => ({ word, type: this.getWordType(word) }))
                ];
                
                // 隨機排列
                for (let i = allWords.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
                }
                
                // 創建單詞元素
                allWords.forEach((wordData, index) => {
                    const wordEl = document.createElement('div');
                    wordEl.textContent = wordData.word;
                    wordEl.className = `boss-word ${wordData.type}-word`;
                    wordEl.style.cssText = `
                        position: absolute;
                        left: ${(index % 5) * 95 + 10}px;
                        top: ${Math.floor(index / 5) * 35 + 10}px;
                        padding: 8px 12px;
                        border-radius: 6px;
                        color: white;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.2s;
                        font-size: 14px;
                        background: ${this.getWordColor(wordData.type)};
                        border: 2px solid transparent;
                    `;
                    
                    wordEl.onmouseover = () => {
                        wordEl.style.transform = 'scale(1.1)';
                        wordEl.style.borderColor = 'white';
                    };
                    
                    wordEl.onmouseout = () => {
                        wordEl.style.transform = 'scale(1)';
                        wordEl.style.borderColor = 'transparent';
                    };
                    
                    wordEl.onclick = () => this.clickWord(wordData, wordEl);
                    gameArea.appendChild(wordEl);
                });
                
                console.log(`生成Boss挑戰: ${challenge.type}音, 目標${challenge.count}個, 實際生成${targetWords.length}個`);
            }
            
            getWordType(word) {
                // 根據單詞判斷類型
                if (this.wordDatabase.t.includes(word)) return 't';
                if (this.wordDatabase.d.includes(word)) return 'd';
                if (this.wordDatabase.id.includes(word)) return 'id';
                return 't'; // 默認
            }
            
            getWordColor(type) {
                switch(type) {
                    case 't': return '#3498db';
                    case 'd': return '#e74c3c';
                    case 'id': return '#2ecc71';
                    default: return '#95a5a6';
                }
            }
            
            clickWord(wordData, element) {
                const challenge = this.challenges[this.currentChallenge];
                
                if (wordData.type === challenge.type) {
                    this.progress++;
                    element.style.background = '#2ecc71';
                    element.style.transform = 'scale(0)';
                    element.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        if (element.parentNode) element.remove();
                    }, 300);
                    
                    if (this.progress >= challenge.count) {
                        this.completePhase();
                    }
                } else {
                    // 錯誤回饋
                    element.style.background = '#e74c3c';
                    element.style.animation = 'shake 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        element.style.background = this.getWordColor(wordData.type);
                        element.style.animation = 'none';
                    }, 500);
                }
                
                this.updateUI();
            }
            
            completePhase() {
                clearInterval(this.gameTimer);
                
                this.bossHealth -= 30;
                this.updateBossHealth();
                
                if (this.currentChallenge >= 2) {
                    this.winBoss();
                } else {
                    this.currentChallenge++;
                    const phaseCompleteMessage = window.gameState.currentLanguage === 'zh' ? 
                        '階段完成！' : 'Phase completed!';
                    window.gameSystem.showMessage(phaseCompleteMessage, 'success', 2000);
                    setTimeout(() => this.startPhase(), 2000);
                }
            }
            
            failPhase() {
                clearInterval(this.gameTimer);
                const timeUpMessage = window.gameState.currentLanguage === 'zh' ? 
                    '時間到！再試一次！' : 'Time up! Try again!';
                window.gameSystem.showMessage(timeUpMessage, 'error', 2000);
                setTimeout(() => {
                    document.getElementById('bossGameArea').style.display = 'none';
                    this.isActive = false;
                }, 2000);
            }
            
            winBoss() {
                this.bossHealth = 0;
                this.updateBossHealth();
                
                // 勝利動畫
                document.getElementById('bossCharacter').style.animation = 'bossDefeat 2s ease-out forwards';
                
                const victoryMessage = window.gameState.currentLanguage === 'zh' ? 
                    '🏆 恭喜！你成為了真正的發音大師！' : 
                    '🏆 Congratulations! You are now a true pronunciation master!';
                window.gameSystem.showMessage(victoryMessage, 'success', 5000);
                
                window.gameSystem.completeGame('bossFight');
            }
            
            updateUI() {
                const challenge = this.challenges[this.currentChallenge];
                document.getElementById('bossProgress').textContent = `${this.progress}/${challenge.count}`;
                document.getElementById('bossTimer').textContent = this.timeLeft;
            }
            
            updateBossHealth() {
                document.getElementById('bossHealthBar').style.width = `${this.bossHealth}%`;
            }
        }
        
        // 初始化應用程式
        function initializeApp() {
            console.log('🚀 初始化應用程式');
            
            const loading = document.getElementById('loadingScreen');
            loading.classList.add('hidden');
            
            window.gameSystem = new GameSystem();
            window.gameSystem.showMainMenu();
            
            console.log('✅ 應用程式初始化成功');
        }
        
        // DOM載入完成時開始
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📋 DOM載入完成，開始初始化');
            setTimeout(initializeApp, 1500);
        });
        
        // 添加自定義CSS動畫
        const additionalCSS = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.5); }
            }
            
            @keyframes bossDefeat {
                0% { transform: translateX(-50%) rotate(0deg); }
                100% { transform: translateX(-50%) rotate(360deg) scale(0.5); opacity: 0; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = additionalCSS;
        document.head.appendChild(style);
    