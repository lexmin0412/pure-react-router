// history.ts
class PureHistory {
  private currentPath: string;
  private historyStack: string[];

  constructor() {
    this.currentPath = window.location.pathname;
    this.historyStack = [this.currentPath];
  }

  get location() {
    return {
			...window.location,
      pathname: this.currentPath,
		};
  }

  push(path: string) {
    this.currentPath = path;
    this.historyStack.push(path);
    console.log('走到 history 的 push 了', path)
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  replace(path: string) {
    this.currentPath = path;
    this.historyStack[this.historyStack.length - 1] = path;
    window.history.replaceState({}, '', path);
  }

  goBack() {
    if (this.historyStack.length > 1) {
      this.historyStack.pop();
      const previousPath = this.historyStack[this.historyStack.length - 1];
      this.currentPath = previousPath;
      window.history.back();
    }
  }
}

export default new PureHistory();
