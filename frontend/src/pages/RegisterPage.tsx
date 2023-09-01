import { FC, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

import { RegisterComponent } from '../components'

export interface RegisterPagePropsInterface extends PropsWithChildren {}

export const RegisterPage: FC<RegisterPagePropsInterface> = () => {
	return (
		<Box>
			<RegisterComponent />;
		</Box>
	)
}
