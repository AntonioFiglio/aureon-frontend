interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    className?: string;
}

export function InputField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
}: InputFieldProps) {
    return (
        <div className="space-y-4">
            <label className="text-white/80 tex-md">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-3 py-2 mt-1 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition ${className}`}
            />
        </div>
    );
}
