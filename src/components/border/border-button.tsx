import * as React from 'react';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {IconChevronDown} from '@tabler/icons';
import {MenuButton} from '../control/menu-button';
import {colors, Color} from '../../util/color';
import './border-button.css';

export interface BorderButtonProps {
	color?: Color;
	disabled?: boolean;
	name: string;
	onChangeColor: (color: Color) => void;
	onRemove: () => void;
}

export const BorderButton: React.FC<BorderButtonProps> = props => {
	const {t} = useTranslation();

	return (
		<span className={classNames('border-button', `color-${props.color}`)}>
			<MenuButton
				disabled={props.disabled}
				icon={<IconChevronDown />}
				iconPosition="end"
				items={[
					...colors.map(color => ({
						checkable: true,
						checked: color === 'none' ? !props.color : color === props.color,
						label: t(`colors.${color}`),
						onClick: () => props.onChangeColor(color)
					})),
					{
						separator: true
					},
					{
						label: t('common.remove'),
						onClick: props.onRemove
					}
				]}
				label={props.name}
			/>
		</span>
	);
};
