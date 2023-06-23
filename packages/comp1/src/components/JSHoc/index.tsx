import React from 'react';
import ReactDOM from 'react-dom';

// 将 react 组件包装成 js 调用方式渲染的高阶组件
export default (Com: any) => {
  return class {
    [x: string]: any;

    constructor(id: string, config: any) {
      this.style = id;
      this.id = id;
      this.config = config;
      this.ref = React.createRef();
    }

    updateConfig(config: any) {
      this.config = config;
      this.ref.current.updateConfig(this.config);
    }

    updateView(style: any) {
      this.config.style = style;
      this.ref.current.updateConfig(this.config);
    }

    render() {
      const dom = document.getElementById(this.id);
      if (dom) {
        const { width, height } = dom.getBoundingClientRect();
        this.config.style = { width, height };
        ReactDOM.render(<Com {...this.config} ref={this.ref} />, dom);
      } else {
        console.warn(`未找到挂载节点${this.id}`);
      }
    }
  };
};
