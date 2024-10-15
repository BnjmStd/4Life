import "@styles/components/common/statcard.css"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoMdTrendingUp } from "react-icons/io";

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
    return (
        <div className="card">
            <main className="card__content">
                <div className="card__main">
                    <header className="card__header">
                        <Icon color={color} />
                    </header>
                    <div className="card__subheader">
                        <span className="card__name">
                            {name}
                        </span>
                        <p className="card__description">
                            description
                        </p>
                    </div>
                </div>
                <span className="card__arrow">
                    -
                </span>
            </main>
            <p className="card__value">
                {value}
            </p>
            <footer className="card__footer">
                <span>
                    <BsFillLightningChargeFill /> 
                    <strong>
                        +15.6%
                    </strong>
                </span>
                <span>
                    <IoMdTrendingUp />
                    +1.4k
                    <small>
                        this weeks
                    </small>
                </span>

            </footer>
        </div>
    );
}