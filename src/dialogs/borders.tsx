import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {DialogCard} from '../components/container/dialog-card';
import {CardContent} from '../components/container/card';
import {DialogComponentProps} from './dialogs.types';
import {
	setBorderColor,
	storyWithId,
	renameBorder,
	storyPassageBorders
} from '../store/stories';
import {useUndoableStoriesContext} from '../store/undoable-stories';
import {Color} from '../util/color';
import {TagEditor} from '../components/tag/tag-editor';

export interface PassageBordersDialogProps extends DialogComponentProps {
	storyId: string;
}

export const PassageTagsDialog: React.FC<PassageBordersDialogProps> = props => {
	const {storyId, ...other} = props;
	const {dispatch, stories} = useUndoableStoriesContext();
	const {t} = useTranslation();

	const story = storyWithId(stories, storyId);
	const borders = storyPassageBorders(story);

	function handleChangeColor(tagName: string, color: Color) {
		dispatch(
			setBorderColor(story, tagName, color),
			t('undoChange.changeBorderColor')
		);
	}

	function handleChangeTagName(tagName: string, newName: string) {
		dispatch(
			renameBorder(story, tagName, newName),
			t('undoChange.renameBorder')
		);
	}

	return (
		<DialogCard
			className="passage-tags-dialog"
			fixedSize
			headerLabel={t('dialogs.passageTags.title')}
			{...other}
		>
			<CardContent>
				{borders.length > 0 ? (
					borders.map(border => (
						<TagEditor
							allTags={borders}
							color={story.tagColors[border]}
							key={border}
							name={border}
							onChangeColor={color => handleChangeColor(border, color)}
							onChangeName={newName => handleChangeTagName(border, newName)}
						/>
					))
				) : (
					<p>{t('dialogs.passageTags.noTags')}</p>
				)}
			</CardContent>
		</DialogCard>
	);
};
