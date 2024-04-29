import { get, writable } from "svelte/store";

export const mobile = writable(false)
export const visibleMobile = writable(false)
export const visibleDesktop = writable(true)
export const InViewport = writable(false)

export const SidebarToggle = () => {
    if (get(mobile)) {
        visibleMobile.set(!get(visibleMobile))
    } else {
        visibleDesktop.set(!get(visibleDesktop))
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