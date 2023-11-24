import React from 'react'
import PropTypes from 'prop-types'


const Input = ({ placeholder, type, value, setValue }) => {
    const goodEmail = () => {

        return <div className='input-error'>Email non valide </div>
    }
    const goodInput = () => {
        // if (value.includes('@') && type == "email") {
        //     return <div className='input-success'>Email valide </div>
        // }
        // if (value.length > 8) {
        //     return <div className='input-success'>Bon Mot de passe </div>
        // }

        // if (value.length > 8 && type == "password") {
        //     return <div className='input-success'>Bon mot de passe </div>
        // }
    }
    return (
        <div>
            <input
                className='input-form'
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={setValue}
            />
            {goodInput()}
        </div>

    )
}

Input.defaultProps = {
    placeholder: 'Entrer votre text',
    type: 'email'

}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func
}

export default Input