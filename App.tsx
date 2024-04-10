import Speedometer from "./app/Speedometer";

export default function App() {
    return (
        <Speedometer labels={[
            {color: '#f00', porcentagem: 25},
            {color: '#0f0', porcentagem: 25},
            {color: '#00f', porcentagem: 10},
            {color: '#f0f', porcentagem: 20},
            {color: '#ff0', porcentagem: 20},
        ]}
                     valor={80}
        />
    );
}

