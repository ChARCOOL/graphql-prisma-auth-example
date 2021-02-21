import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components'
import { toast } from 'react-toastify'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { request } from 'graphql-request'
import { LOG_IN } from '../utils/queries'

import Button from '../components/Button'

const RegisterSchema = Yup.object().shape({
  email: Yup.string().required('Required.'),
  password: Yup.string().required('Required'),
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 10px;
`

const FormikForm = styled(Form)`
  font-size: 20px;
  margin-top: 10vh;
  margin-bottom: 10vh;
  max-width: min-content;
`

const FormField = styled(Field)`
  font-size: 18px;
  display: block;
  padding: 5px 10px;
  margin-bottom: 2px;
  border-radius: 2.5px;
  border: 1px solid black;
  outline: none;
`

const FormLabel = styled.label`
  display: block;
  margin-left: 0.25em;
  margin-top: 20px;
  margin-bottom: 10px;
`

const ErrorContainer = styled.p`
  color: #cf1322;
  font-size: 1em;
  padding: 0.25em 0.25em;
  border-radius: 3px;
`

const SubmitContainer = styled.div`
  margin: 2em 0em;
  text-align: center;
`

const Register: React.FC = () => {
  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Container>
      <H1>Login</H1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          setLoading(true)

          try {
            const {
              login: { token, user },
            } = await request(process.env.REACT_APP_API_SERVER!, LOG_IN, values)

            setLoading(false)

            setTimeout(() => {
              history.push('/')
            }, 1500)

            localStorage.removeItem('user')

            localStorage.setItem(
              'user',
              JSON.stringify({ token, ...user }, undefined, 2),
            )

            return toast.success('Successfully logged in, redirecting to home!')
          } catch ({ response: { errors } }) {
            setLoading(false)

            return toast.error(errors[0].message)
          }
        }}
      >
        {() => (
          <FormikForm>
            <FormLabel htmlFor="email">Email: </FormLabel>
            <FormField
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
            />
            <ErrorContainer>
              <ErrorMessage name="email" />
            </ErrorContainer>
            <FormLabel htmlFor="password">Password: </FormLabel>
            <FormField
              id="password"
              name="password"
              type="password"
              placeholder="********"
            />
            <ErrorContainer>
              <ErrorMessage name="password" />
            </ErrorContainer>
            <SubmitContainer>
              <Button primary type="submit" disabled={loading}>
                Login
              </Button>
            </SubmitContainer>
          </FormikForm>
        )}
      </Formik>
    </Container>
  )
}

export default Register
