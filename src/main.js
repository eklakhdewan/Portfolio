import { initRouter } from './router.js';
import { initBot } from './bot.js';

document.addEventListener('DOMContentLoaded', () => {
  const botManager = initBot();

  if (botManager) {
    initRouter(botManager);
  }
});
