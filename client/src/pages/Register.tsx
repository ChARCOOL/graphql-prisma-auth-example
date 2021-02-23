import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components'
import { toast } from 'react-toastify'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { request } from 'graphql-request'
import { CREATE_USER } from '../utils/queries'

import Button from '../components/Button'

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short.')
    .max(50, 'Too Long.')
    .matches(/^[a-zA-Z]+$/g, 'Only latin letters.')
    .required('Required.'),
  email: Yup.string().email('Invalid email.').required('Required.'),
  password: Yup.string()
    .min(8, 'Too Short.')
    .max(50, 'Too Long.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/g,
      `At least one uppercase letter,
      one lowercase letter,
      one number,
      one special character.`,
    )
    .required('Required'),
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

  const [loading, setLoading] = useState(false)

  return (
    <Container>
      <H1>Register</H1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          setLoading(true)

          try {
            await request(
              process.env.REACT_APP_API_SERVER!,
              CREATE_USER,
              values,
            )

            setLoading(false)

            setTimeout(() => {
              history.push('/login')
            }, 1500)

            return toast.success(
              'Successfully registered, redirecting to login!',
            )
          } catch ({ response: { errors } }) {
            setLoading(false)

            if (errors[0].extensions.exception.code === 'P2002') {
              return toast.error('User already registered!')
            } else {
              return toast.error('An error occurred try again later!')
            }
          }
        }}
      >
        {() => (
          <FormikForm>
            <FormLabel htmlFor="username">Username: </FormLabel>
            <FormField id="username" name="username" />
            <ErrorContainer>
              <ErrorMessage name="username" />
            </ErrorContainer>
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
                Register
              </Button>
            </SubmitContainer>
          </FormikForm>
        )}
      </Formik>
    </Container>
  )
}

export default Register
