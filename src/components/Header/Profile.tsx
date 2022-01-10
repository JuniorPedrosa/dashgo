import {Flex, Box, Text, Avatar} from '@chakra-ui/react'

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
    return (
        <Flex 
        align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Junior Pedrosa</Text>
                    <Text color="gray.300" fontSize="small">juniorpedrosa_@hotmail.com</Text>
                </Box>
            )}
            
            <Avatar size="md" name="Junior Pedrosa" src="https://github.com/juniorpedrosa.png"/>
        </Flex>
    )
}