import { get, writable } from "svelte/store";

export const Mobile = writable(false)
export const VisibleMobile = writable(false)
export const VisibleDesktop = writable(true)
export const InViewport = writable(false)

export const SidebarToggle = () => {
    if (get(Mobile)) {
        VisibleMobile.set(!get(VisibleMobile))
    } else {
        VisibleDesktop.set(!get(VisibleDesktop))
    }
}

export const isInViewPort = (element: HTMLElement) => {
    // clientHeight 兼容所有浏览器写法
    const clientHeight =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const offsetTop = element.offsetTop;
    const scrollTop = document.documentElement.scrollTop;
    return offsetTop <= clientHeight + scrollTop;
};