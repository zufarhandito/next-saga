import React, { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

interface HargaInputProps {
    register: any;
}

const HargaInput: React.FC<HargaInputProps> = ({ register }) => {
    const [harga, setHarga] = useState<string>('');

    // Fungsi untuk mengubah angka menjadi format Rupiah
    const formatToRupiah = (angka: string): string => {
        if (!angka) return '';
        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parseInt(angka));

        return rupiah;
    };

    // Fungsi untuk menghapus karakter selain angka
    const removeNonNumeric = (value: string): string => {
        return value.replace(/[^0-9]/g, '');
    };

    // Handler saat input berubah
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const numericValue = removeNonNumeric(value);
        setHarga(numericValue);
    };


    return (
        <input
            type="text"
            name="price"
            {...register('price', { required: 'Price is required' })}
            value={formatToRupiah(harga)}
            onChange={handleChange}
            placeholder="Rp 0"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
    );
};

export default HargaInput;
