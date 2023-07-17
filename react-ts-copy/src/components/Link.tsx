import { Link as RRDLink, type LinkProps as RRDLinkProps } from 'react-router-dom'
import { type DiaryRouterPath } from '../router'

interface LinkProps extends RRDLinkProps {
    to: DiaryRouterPath
}
export const Link = ({ children, to, ...linkProps }: React.PropsWithChildren<LinkProps>) => (
    <RRDLink {...linkProps} to={to}>
        {children}
    </RRDLink>
)
