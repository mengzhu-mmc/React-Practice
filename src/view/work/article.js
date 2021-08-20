import React, {useRef, useEffect} from 'react'

export default function Article(props) {
    let {data} = props
    let wrap = useRef(null)
    useEffect(()=>{
        let imgs = wrap.current.querySelectorAll('img')
        imgs.forEach(img => {
            // 每张图片加载完成之后，都重新渲染页面
            img.onload = function () {
                window.pageScroll.refresh()
            }
        });
    }, [data])
    return (<div className="miiaov_article" ref={wrap}>
        <h3>{data.title}</h3>
        <div className="miiaov_txt"
            dangerouslySetInnerHTML={{
                __html: data.content
            }}
        >
        </div>
      </div>)
}