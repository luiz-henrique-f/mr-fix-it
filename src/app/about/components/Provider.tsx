import { prisma } from "@/lib/prisma";
import React, { useState } from "react";

const getProviders = async () => {
    const providers = await prisma.prestador.findMany({});

    return providers;
};

const Providers = async () => {
const data = await getProviders();

console.log({data});

    return <div>Providers</div>
};

export default Providers;