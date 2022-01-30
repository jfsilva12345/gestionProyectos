// vendors
import React, { useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import { Formik } from "formik";
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const UPDATE_USER = gql `
    mutation updateUser($_id: ID, $name: String, $lastName: String, $fullName: String, $email: String, $documentId: Float, $password: String, $role: String, $status: String) {
        updateUser(_id: $_id, name: $name, lastName: $lastName, fullName: $fullName, email: $email, documentId: $documentId, password: $password, role: $role, status: $status) {
            _id
            name
            lastName
            fullName
            email
            documentId
            password
            role
            status
        }
    }
`;

const GET_USER = gql `
    query User($_id: ID!) {
        User(_id: $_id) {
            _id
            name
            lastName
            fullName
            email
            documentId
            password
            role
            status
        }
    }
`;

const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido'),
    documentId: Yup.number('Ingresa solo números'),
})

const UpdateUser = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [updateUser] = useMutation(UPDATE_USER);
    const { _id } = useParams();
    const { data } = useQuery(GET_USER, {variables: { _id }});

    return (
        <Row className="mt-3 justify-content-center">
            <Col lg="5">
                <Alert dismissible variant="danger" onClose={() => setError(false)} show={error}>
                    Error actualizando información del usuario
                </Alert>
                <Alert dismissible variant="success" onClose={() => setSuccess(false)} show={success}>
                    ¡Usuario actualizado con éxito!
                </Alert>
                <Formik
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    updateUser({
                    variables: {
                        input: {
                        ...values,
                        }
                    }
                    })
                    .then(() => {
                    setError(false);
                    setSuccess(true);
                    })
                    .catch(() => setError(true));
                }}
                >
                {({
                    handleSubmit,
                    getFieldProps,
                    errors,
                    touched
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                        name="name"
                        value="NOMBRE"
                        // placeholder="Ingresa tu nombre"
                        isInvalid={touched.name && !!errors.name}
                        {...getFieldProps('name')}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                        name="lastName"
                        // placeholder="Ingresa tu apellido" 
                        isInvalid={touched.lastName && !!errors.lastName}
                        {...getFieldProps('lastName')}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                        name="fullName"
                        // placeholder="Ingresa tu nombre completo" 
                        isInvalid={touched.fullName && !!errors.fullName}
                        {...getFieldProps('fullName')}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.fullName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control 
                        name="email" 
                        type="email" 
                        // placeholder="Ingresa tu correo" 
                        isInvalid={touched.email && !!errors.email}
                        {...getFieldProps('email')}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDocumentId">
                        <Form.Label>Documento de identidad</Form.Label>
                        <Form.Control 
                        name="documentId"
                        type="number"
                        // placeholder="Ingresa tu documento de identidad"
                        isInvalid={touched.documentId && !!errors.documentId}
                        {...getFieldProps('documentId')}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.documentId}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                        name="password"
                        type="password"
                        // placeholder="Contraseña" 
                        isInvalid={touched.password && !!errors.password}
                        {...getFieldProps('password')}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control 
                        readOnly
                        // defaultValue={data.user.role.value}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.role}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control 
                        readOnly
                        // defaultValue={data.user.role.value}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.status}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Actualizar</Button>
                    </Form>
                )}
                </Formik>
            </Col>
        </Row>
    );
};

export default UpdateUser;