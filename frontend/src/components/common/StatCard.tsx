import "@styles/components/common/statcard.css"

export default function StatCard(
    {
        name,
        Icon,
        value,
        color
    }: {
        name: string,
        Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        value: string | number,
        color: string
    }) {
    {/*  */ }
    return (
        <div className="card">
            <div className="card__content">
                <span className="card__name">
                    {name}
                </span>
                <Icon color={color}/>
                <p className="card__value">{value}</p>
            </div>
        </div>
    );
}
