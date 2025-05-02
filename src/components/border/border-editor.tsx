import * as React from 'react';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';
import {IconWriting} from '@tabler/icons';
import {colors, Color} from '../../util/color';
import {PromptButton, PromptValidationResponse} from '../control/prompt-button';
import {TextSelect} from '../control/text-select';
import './border-editor.css';

export interface BorderEditorProps {
	allBorders: string[];
	color?: Color;
	name: string;
	onChangeColor: (color: Color) => void;
	onChangeName: (name: string) => void;
}

export const BorderEditor: React.FC<BorderEditorProps> = props => {
	const {allBorders, color, name, onChangeColor, onChangeName} = props;
	const [newName, setNewName] = React.useState(name);
	const {t} = useTranslation();

	function validate(value: string): PromptValidationResponse {
		if (value !== name && allBorders.includes(value)) {
			return {message: t('components.borderEditor.alreadyExists'), valid: false};
		}

		return {valid: true};
	}

	return (
		<div className="border-editor">
			<span className={classNames('border-name', `color-${props.color}`)}>
				{props.name}
			</span>
			<PromptButton
				icon={<IconWriting />}
				label={t('common.rename')}
				onChange={e => setNewName(e.target.value.replace(/\s/g, '-'))}
				onSubmit={() => onChangeName(newName)}
				prompt={t('common.renamePrompt', {name})}
				value={newName}
				validate={validate}
			/>
			<TextSelect
				onChange={e => onChangeColor(e.target.value)}
				options={colors.map(color => ({
					label: t(`colors.${color}`),
					value: color
				}))}
				value={color ?? ''}
			>
				{t('common.color')}
			</TextSelect>
		</div>
	);
};
