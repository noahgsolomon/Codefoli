type Props = {
    imageUrl?: string,
    title: string,
    description: string,
}

const Card: React.FC<Props> = ({ imageUrl, title, description }) => {
    return (
        <div className="card border-2 border-black rounded-lg max-w-[400px] md:flex md:items-center md:max-w-[450px]">
            {imageUrl && <div className="img-wrapper w-full md:h-full h-[300px]"><img className="rounded-t-lg  w-full h-full inline-block md:rounded-tr-none md:rounded-l-lg md:object-fill object-cover" src={imageUrl} alt="" /></div>}
            <div className="content p-5">
                <h2 className="title font-bold text-2xl">{title}</h2>
                <p className="description font-semibold">{description}</p>
            </div>
        </div>
    )
}

export default Card