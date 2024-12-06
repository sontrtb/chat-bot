export enum EModeApp {
    DEFAULT = 'default',
    KIOSK = 'kiosk'
}

const useGetMode = () => {
    // return EModeApp.KIOSK 
    const href = window.location.href
    if(href.includes(EModeApp.KIOSK)) {
        return EModeApp.KIOSK 
    }
    return EModeApp.DEFAULT 
}

export {useGetMode}