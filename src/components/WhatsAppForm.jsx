import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";

const WhatsAppForm = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    temperature: '',
    temperatureType: '',
    mediaTemperature: 55,
    bajaTemperature: 125,
    height: '',
    width: '',
  });

  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const {
      name,
      phoneNumber,
      address,
      temperature,
      temperatureType,
      mediaTemperature,
      bajaTemperature,
      height,
      width,
    } = formData;

    let whatsappMessage = `¡Hola! Mi nombre es ${name}. Mi número de teléfono es ${phoneNumber}. Mi dirección de entrega es ${address}.`;

    if (temperatureType === 'media') {
      whatsappMessage += ` Tipo de Paneles: Media Temperatura. Grosor: ${mediaTemperature} mm.`;
    } else if (temperatureType === 'baja') {
      whatsappMessage += ` Tipo de Paneles: Baja Temperatura. Grosor: ${bajaTemperature} mm.`;
    }

    let cartTotal = 0;

    if (cartItems?.length > 0) {
      whatsappMessage += ' Mi pedido:';

      cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        whatsappMessage += ` ${item.quantity}x ${item.name}, Precio Total: $${itemTotal}.`;
      });
    }

    whatsappMessage += ` Temperatura: ${temperature}°C. Altura: ${height} cm. Ancho: ${width} cm. Total: $${cartTotal}.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '+542604224940';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
  };
    return (
        <div>
            <FormControl>
                <FormLabel>Nombre:</FormLabel>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Número de Teléfono:</FormLabel>
                <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Dirección de Entrega:</FormLabel>
                <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Temperatura:</FormLabel>
                <select
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                >
                    <option disabled selected value="">Escoge una opción</option>
                    <optgroup label="Media temperatura">
                        <option value="0">0°C</option>
                        <option value="1">1°C</option>
                        <option value="2">2°C</option>
                        <option value="3">3°C</option>
                        <option value="4">4°C</option>
                        <option value="5">5°C</option>
                    </optgroup>
                    <optgroup label="Baja temperatura">
                        <option value="-18">-18°C</option>
                        <option value="-19">-19°C</option>
                        <option value="-20">-20°C</option>
                        <option value="-21">-21°C</option>
                        <option value="-22">-22°C</option>
                        <option value="-23">-23°C</option>
                        <option value="-24">-24°C</option>
                        <option value="-25">-25°C</option>

                    </optgroup>
                </select>
            </FormControl>
            <FormControl>
                <FormLabel>Tipo de Paneles:</FormLabel>
                <select
                    name="temperatureType"
                    value={formData.temperatureType}
                    onChange={handleChange}
                >
                    <option disabled selected value="">Escoge una opción</option>
                    <option value="media">Media temperatura</option>
                    <option value="baja">Baja temperatura (congelado)</option>
                </select>
            </FormControl>
            {formData.temperatureType === 'media' && (
                <div className="form-group" id="mediaTemperatureSlider">
                    <FormLabel>Expesor (50-60 mm)</FormLabel>
                    <input
                        type="range"
                        min="50"
                        max="60"
                        value={formData.mediaTemperature}
                        onChange={handleChange}
                        className="slider"
                        name="mediaTemperature"
                    />
                    <span id="mediaTemperatureValue">{formData.mediaTemperature} mm</span>
                </div>
            )}
            {formData.temperatureType === 'baja' && (
                <div className="form-group" id="bajaTemperatureSlider">
                    <FormLabel>Expesor (100-150 mm)</FormLabel>
                    <input
                        type="range"
                        min="100"
                        max="150"
                        value={formData.bajaTemperature}
                        onChange={handleChange}
                        className="slider"
                        name="bajaTemperature"
                    />
                    <span id="bajaTemperatureValue">{formData.bajaTemperature} mm</span>
                </div>
            )}
            <FormControl>
                <FormLabel>Altura (cm):</FormLabel>
                <Input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    min="0"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Ancho (cm):</FormLabel>
                <Input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    min="0"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Mensaje (opcional):</FormLabel>
                <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
            </FormControl>
            <Button onClick={handleSubmit}>Enviar Pedido por WhatsApp</Button>
        </div>
    );
};

export default WhatsAppForm;
