interface BarbershopsDetailPageProps {
    params: any
}

const BarbershopsDetailPageProps = ({ params }: BarbershopsDetailPageProps) => {
    return (
        <h1>{params.id}</h1>
    )
}

export default BarbershopsDetailPageProps;