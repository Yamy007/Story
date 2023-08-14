import { useEffect } from 'react'
import { UserAuth } from '../../api/user'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../../reduxCore/actions/UserAction'

export const UserApi = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		const FetchData = async () => {
			const check = await UserAuth().check()

			if (check.data.response) {
				const response = await UserAuth().Profile()
				if (response?.response?.status) {
					dispatch(UserActions.setError(response))
				} else {
					dispatch(UserActions.setUser(response?.data?.user_data))
				}
			} else {
				console.log('not auth')
			}
		}
		FetchData()
	}, [])
}
