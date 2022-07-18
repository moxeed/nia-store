import {Table} from "rsuite";
import {useEffect, useState} from "react";
import {ProductBrief} from "../models/product-brief";
import Link from "next/link";

export const ProductTable = () => {
    const [products, setProducts] = useState(new Array<ProductBrief>())

    useEffect(() => {
        fetch("/api/admin/product")
            .then(res => res.json())
            .then(setProducts)
    }, [])

    return <Table data={products} fillHeight>
        <Table.Column flexGrow={1}  align="center">
            <Table.HeaderCell>شناسه</Table.HeaderCell>
            <Table.Cell dataKey="id"/>
        </Table.Column>

        <Table.Column flexGrow={1} >
            <Table.HeaderCell>عنوان</Table.HeaderCell>
            <Table.Cell dataKey="name"/>
        </Table.Column>

        <Table.Column flexGrow={1} >
            <Table.HeaderCell>قیمت</Table.HeaderCell>
            <Table.Cell dataKey="price"/>
        </Table.Column>

        <Table.Column flexGrow={2} >
            <Table.HeaderCell>تاریخ ایجاد</Table.HeaderCell>
            <Table.Cell dataKey="createDateTime"/>
        </Table.Column>

        <Table.Column flexGrow={2} >
            <Table.HeaderCell>تاریخ ویرایش</Table.HeaderCell>
            <Table.Cell dataKey="updateDateTime"/>
        </Table.Column>
        <Table.Column flexGrow={1} fixed="right">
            <Table.HeaderCell>عملیات</Table.HeaderCell>
            <Table.Cell>
                {rowData => <span>
                    <Link href={"/admin/product/" + rowData.id}>
                        ویرایش
                    </Link>
                  </span>}
            </Table.Cell>
        </Table.Column>
    </Table>
}