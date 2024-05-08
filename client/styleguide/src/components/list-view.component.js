import { useLayoutEffect, useRef, useState } from "react"

export function InfiniteListView({limit = 10, ...props}) {
    const children = useRef(props.children);
    const limit = useRef(props.limit);

    const [index, setIndex] = useState(0);
    const [cacheOffset, setCacheOffset] = useState(0);

    useLayoutEffect(() => {

    }, [index])

    return (
        <div className="infinite-list-view">

        </div>
    )
}