

interface ServiceItemProps {
    service: Service
}

export const ServiceItem = ({service}: ServiceItemProps) => {
    return (
        <h1>{service.name}</h1>
    )
}
 