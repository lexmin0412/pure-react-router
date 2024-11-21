interface IPureHistoryOptions {
  basename?: string;
}

/**
 * 自定义 history 类
 */
class PureHistory {
  private basename: string
  private currentPath: string;
  private historyStack: string[];

  constructor(options: IPureHistoryOptions) {
    this.basename = options.basename || ''
    this.currentPath = this.basename ? window.location.pathname.slice(this.basename.length) : window.location.pathname;
    this.historyStack = [this.currentPath];
  }

  public getFullPath = (path: string) => {
    return `${this.basename}${path}`
  }


  public get location() {
    return {
			...window.location,
      pathname: this.currentPath,
		};
  }

  public push = (path: string) => {
    this.currentPath = path;
    this.historyStack = [...(this.historyStack || []), path]
    window.history.pushState({}, '', this.getFullPath(path));
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  public replace = (path: string) => {
    this.currentPath = path;
    this.historyStack[this.historyStack.length - 1] = path;
    window.history.replaceState({}, '', this.getFullPath(path));
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  public goBack = () => {
    if (this.historyStack.length > 1) {
      this.historyStack.pop();
      const previousPath = this.historyStack[this.historyStack.length - 1];
      this.currentPath = previousPath;
      window.history.back();
    }
  }
}

export default PureHistory
