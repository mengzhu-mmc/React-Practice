function useBack(history) {
    return () => {
        if (history.length > 1) {
            history.goBack()
        } else {
            history.push('/')
        }
    }   
} 

function useInnerHeight() { 
    return window.innerHeight
 }

export default {
    useBack,
    useInnerHeight
}
