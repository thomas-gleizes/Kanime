import { Gender } from '@prisma/client'
import { userModel } from 'models'
import Security from 'services/security.service'

describe('users model', () => {
  let userId: number

  it('should create user', async () => {
    const password: string = 'password'
    const username: string = 'Kalat'
    const email: string = 'kalat@email.fr'

    const user = await userModel.create({
      username: username,
      email: email,
      password: Security.sha512(password)
    })

    expect(user).toBeDefined()

    userId = user.id

    expect(Security.compare(password, user.password)).toBeTruthy()
    expect(user.isAdmin).toBeFalsy()
    expect(user.followCount).toEqual(0)
    expect(user.followerCount).toEqual(0)
    // expect(user.avatar).toEqual(DEFAULT_USER_MEDIA.avatar)
    // expect(user.background).toEqual(DEFAULT_USER_MEDIA.background)
    expect(user.gender).toEqual('Secret')
  })

  it('should update user', async () => {
    const bio: string = 'Ceci est une description de test'
    const gender: Gender = 'Male'
    const birthDay: Date = new Date('1999-05-21')
    const city: string = 'Montpellier'

    const updateUser = await userModel.update(userId, {
      avatar: '',
      background: '',
      birthday: birthDay,
      city: city,
      bio: bio,
      gender: gender
    })

    expect(updateUser.bio).toEqual(bio)
    expect(updateUser.city).toEqual(city)
    expect(updateUser.gender).toEqual(gender)
    expect(updateUser.birthday.toString()).toEqual(birthDay.toString())
  })
})
