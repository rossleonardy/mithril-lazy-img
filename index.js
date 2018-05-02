"use strict";

export default {
	oninit: function(vnode) {
		this.observer = new IntersectionObserver(
			(change) => {
				this.isIntersecting = change[0].isIntersecting;
				if (this.isIntersecting) this.hasIntersected = true;
				m.redraw();
			}, 
			{threshold: [vnode.attrs.threshold || .5]});
	},
	view: function(vnode) {
		var attrs = vnode.attrs;
		var loadedClassName = vnode.loadedClassName || 'img-loaded'
		attrs.src = this.hasIntersected ? vnode.attrs.dataSrc : vnode.attrs.dataLQSrc || '',
		attrs.class = (this.hasIntersected ? (loadedClassName + ' ') : ' ') + (vnode.attrs.class || '')
		return m('img', attrs);
	},
	oncreate: function(vnode) {
		this.observer.observe(vnode.dom);
	}
}
