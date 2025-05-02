import {Thunk} from 'react-hook-thunk-reducer';
import {Color} from '../../../util/color';
import {isValidTagName} from '../../../util/tag';
import {StoriesState, Story, UpdateStoryAction} from '../stories.types';

export function setBorderColor(
	story: Story,
	name: string,
	color: Color
): Thunk<StoriesState, UpdateStoryAction> {
	if (!isValidTagName(name)) {
		throw new Error(`"${name}" is not a valid border name.`);
	}

	return dispatch => {
		// Special handling: if the color is set to none, just delete it.

		if (color === 'none') {
			if (name in story.borderColors) {
				const borderColors = {...story.borderColors};

				delete borderColors[name];

				dispatch({
					type: 'updateStory',
					props: {borderColors},
					storyId: story.id
				});
			}
		} else {
			dispatch({
				type: 'updateStory',
				props: {borderColors: {...story.borderColors, [name]: color}},
				storyId: story.id
			});
		}
	};
}
