"use client";

import {
    CarCard,
    CustomeFilter,
    Hero,
    SearchBar,
    ShowMore,
} from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [allCars, setAllCars] = useState([]);
    const [loading, setLoading] = useState(false);

    // search states
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");

    // filter states
    const [fuel, setFuel] = useState("");
    const [year, setYear] = useState(2024);

    // pagination limit
    const [limit, setLimit] = useState(10);

    const getCars = async () => {
        setLoading(true);

        try {
            const result = await fetchCars({
                manufacturer: manufacturer || "",
                year: year || 2022,
                fuel: fuel || "",
                limit: limit || 10,
                model: model || "",
            });

            setAllCars(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCars();
    }, [fuel, year, manufacturer, model, limit]);

    return (
        <main className="overflow-hidden">
            <Hero />

            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore the cars you might like</p>
                </div>

                <div className="home__filters">
                    <SearchBar
                        setManufacturer={setManufacturer}
                        setModel={setModel}
                    />

                    <div className="home__filter-container">
                        <CustomeFilter
                            title="fuel"
                            options={fuels}
                            setFilter={setFuel}
                        />
                        <CustomeFilter
                            title="year"
                            options={yearsOfProduction}
                            setFilter={setYear}
                        />
                    </div>
                </div>

                {allCars.length > 0 ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars?.map((car) => (
                                <CarCard car={car} />
                            ))}
                        </div>

                        {loading && (
                            <div className="mt-16 w-full flex-center">
                                <Image
                                    src="/public/loader.png"
                                    alt="loading"
                                    width={50}
                                    height={50}
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <ShowMore
                            pageNumber={limit / 10}
                            isNext={limit > allCars.length}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2 className="text-black text-x1 font-bold">
                            No results
                        </h2>
                        <p>{allCars?.message}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
