import { Leading } from "./leading.component";
import "./section.css"

export function Section({subtitle, title, controller, children, countdown}) {
    return (
        <section>
            <div className="heading">
                <div className="title">
                    <div className="subtitle">
                        <Leading />
                        <h3>{subtitle}</h3>
                    </div>
                    <h2>{title}</h2>
                </div>
                {countdown}
                <div className="controller">
                    {controller}
                </div>
            </div>
            <div className="content">
                    {children}
            </div>
        </section>
    )
}