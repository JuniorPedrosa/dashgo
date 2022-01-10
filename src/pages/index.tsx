import { Flex, Button, Stack} from '@chakra-ui/react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { Input } from '../components/Form/Input'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


type SignInFormData = {
    email: string;
    password: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required(),
    password: yup.string().required()
})

export default function SignIn() {
    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
        resolver: yupResolver(signInFormSchema)
    })


    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        await new Promise(resolve=> setTimeout(resolve, 2000))

        console.log(values)
    }

    return(
        <Flex
          w="100vw"
          h="100vh"
          align="center"
          justify="center"
        >
            <Flex
              as="form"
              w="100%"
              maxW={360}
              bg="gray.800"
              padding= "8"
              borderRadius={8}
              flexDir="column"
              onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing="4">
                    <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email}/>
                    
                    <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password}/>
                    
                </Stack>

               <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={isSubmitting}>Entrar</Button>
            </Flex>
        </Flex>
    )
}