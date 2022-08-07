import {ReactNode} from "react";

export const NiaWrapper = ({children, className} : {children: ReactNode, className?: string}) => {
    return <div className={"rounded-xl bg-white m-2 overflow-hidden " + className}>
        {children}
    </div>
}