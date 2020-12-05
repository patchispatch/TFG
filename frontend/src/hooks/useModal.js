import {useState} from 'react'

function useModal() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleModal = () => {
        setIsVisible(!isVisible)
    }

    return [isVisible, toggleModal]
}

export default useModal