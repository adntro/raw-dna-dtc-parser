import {chr} from '../raw.models';

export const isAutosomal = (chr: chr) => 'X,Y,XY,MT'.indexOf(chr) === -1;
