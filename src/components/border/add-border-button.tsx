import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {colors, Color} from '../../util/color';
import {IconPlus, IconX} from '@tabler/icons';
import {ButtonBar} from '../container/button-bar';
import {CardContent} from '../container/card';
import {CardButton} from '../control/card-button';
import {IconButton} from '../control/icon-button';
import {TextInput} from '../control/text-input';
import {TextSelect} from '../control/text-select';
import {isValidTagName} from '../../util/tag';
import './add-border-button.css';

export interface AddBorderButtonProps {
	/**
	 * Borders that have been assigned to this object.
	 */
	assignedBorder: string | null;
	/**
	 * Is the button disabled?
	 */
	disabled?: boolean;
	/**
	 * Other borders that have been assigned to this type of object.
	 */
	existingBorders: string[];
	/**
	 * Icon for the button.
	 */
	icon?: React.ReactNode;
	/**
	 * Label for the button.
	 */
	label?: string;
	/**
	 * Called when the user chooses to add a border. If they are adding a
	 * pre-existing border, it will only send a name.
	 */
	onAdd: (name: string, color?: Color) => void;
}

export const AddBorderButton: React.FC<AddBorderButtonProps> = props => {
	const {assignedBorder, disabled, existingBorders, icon, label, onAdd} = props;
	const [creatingBorder, setCreatingBorder] = React.useState(true);
	const [newColor, setNewColor] = React.useState<Color>('none');
	const [newName, setNewName] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const {t} = useTranslation();

	let validationMessage: string | undefined = undefined;
	let canAdd = isValidTagName(newName); // This is a border but just use the same logic as tag names

	if (!canAdd && newName !== '') {
		validationMessage = t('components.addBorderButton.invalidName');
	}

	if (canAdd && creatingBorder) {
		canAdd = !existingBorders.includes(newName);

		if (!canAdd) {
			validationMessage = t('components.addBorderButton.alreadyAdded');
		}
	}

	function handleAdd() {
		if (creatingBorder) {
			onAdd(newName, newColor);
		} else {
			onAdd(newName);
		}

		setOpen(false);
	}

	function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const borderName = event.target.value;

		setNewName(borderName);
		setCreatingBorder(borderName === '');
	}

	return (
		<span className="add-border-button">
			<CardButton
				ariaLabel={t('components.addBorderButton.addLabel')}
				disabled={disabled}
				icon={icon ?? <IconPlus />}
				label={label ?? t('common.border')}
				onChangeOpen={setOpen}
				open={open}
			>
				<CardContent>
					<TextSelect
						onChange={handleSelectChange}
						options={[
							{label: t('components.addBorderButton.newBorder'), value: ''},
							...existingBorders.map(border => ({
								disabled: assignedBorder != null,
								label: border,
								value: border
							}))
						]}
						value={creatingBorder ? '' : newName}
					>
						{t('components.addBorderButton.addLabel')}
					</TextSelect>
					{creatingBorder && (
						<>
							<TextInput
								onChange={e => setNewName(e.target.value.replace(/\s/g, '-'))}
								value={newName}
							>
								{t('components.addBorderButton.borderNameLabel')}
							</TextInput>
							<TextSelect
								onChange={e => setNewColor(e.target.value)}
								options={colors.map(color => ({
									label: t(`colors.${color}`),
									value: color
								}))}
								value={newColor}
							>
								{t('components.addBorderButton.borderColorLabel')}
							</TextSelect>
						</>
					)}
					{creatingBorder && !!validationMessage && <p>{validationMessage}</p>}
				</CardContent>
				<ButtonBar>
					<IconButton
						disabled={!canAdd}
						icon={<IconPlus />}
						label={t('common.set')}
						onClick={handleAdd}
						variant="create"
					/>
					<IconButton
						icon={<IconX />}
						label={t('common.cancel')}
						onClick={() => setOpen(false)}
					/>
				</ButtonBar>
			</CardButton>
		</span>
	);
};
