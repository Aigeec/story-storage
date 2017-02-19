import { StoryStoragePage } from './app.po';

describe('story-storage App', () => {
  let page: StoryStoragePage;

  beforeEach(() => {
    page = new StoryStoragePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
