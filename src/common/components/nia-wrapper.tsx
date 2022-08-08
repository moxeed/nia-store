import {CSSProperties, ReactNode} from "react";

export const NiaWrapper = ({children, className, style} : {children: ReactNode, className?: string, style?: CSSProperties}) => {
    return <div style={style} className={"rounded-xl bg-white m-2 overflow-hidden " + className}>
        {children}
    </div>
}