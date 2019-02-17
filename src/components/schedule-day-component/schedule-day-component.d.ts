import '../../../dist/types/stencil.core';
import { ScheduleResource } from '../../view/ScheduleResource';
export declare class ScheduleDayComponent {
    element: any;
    resources: Array<ScheduleResource>;
    componentDidLoad(): void;
    render(): JSX.Element;
    onHeaderChange(): void;
    onSlotChange(): void;
}
