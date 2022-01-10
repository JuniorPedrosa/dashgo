import {Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button} from '@chakra-ui/react'
import Link from 'next/link'
import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'



type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório!'),
    email: yup.string().email('E-mail inválido!').required('E-mail obrigatório!'),
    password: yup.string().required('Senha obrigatória!').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null,
        yup.ref('password')
    ], 'As senhas devem ser iguais'),
})

export default function CreateUser(){
    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
        resolver: yupResolver(CreateUserFormSchema)
    })

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log(values)
    }

    return(
        <Box>
            <Header/>

            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />

                <Box as="form" flex="1" borderRadius={8} bgColor="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="lg" fontWeight="normal">
                        Criar Usuário
                    </Heading>
                    <Divider my="6" borderColor="gray.700"/>

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                            <Input name="name" label="Nome Completo" {...register('name')} error={errors.name}/>
                            <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email}/>
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                            <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password}/>
                            <Input name="password_confirmation" type="password" label="Confirmação da senha" {...register('password_confirmation')} error={errors.password_confirmation}/>
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink"  isLoading={isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}