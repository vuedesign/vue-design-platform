import { FC, ReactElement, ComponentType } from 'react';
import { IconType, Icon } from '@icon-park/react/es/all';

type MapType = Record<string, Icon>;
export type IconComponentProps = {
    is: IconType;
    map: MapType;
    theme: string;
    size: number;
    fill: string;
};

export const IconRender: FC<IconComponentProps> = ({
    is,
    map,
    ...other
}): ReactElement<any, any> | null => {
    if (!map[is]) {
        console.warn(`not found ${is}`);
        return null;
    }
    const Comp: any = map[is];
    return <Comp {...other} />;
};
